#!/usr/bin/env node
const path = require('path');
const { exec } = require('child_process');

const program = require('commander');
const pkg = require(path.join(__dirname, 'package.json'));
const colors = require('colors');

const config = require('./src/config');
const screenOutput = require('./src/screenOutput');

const ethTools = require('./src/ethTools');
const tryWeb3 = require('./src/tryWeb3');

const DEFAULT_RPC_PORT = 8545;

function nodeSpecifier(program) {
  if (program.host) {
    const nodeConfig = {};
    nodeConfig[program.host] = [program.port || DEFAULT_RPC_PORT];

    return nodeConfig;
  }

  return config.nodes;
}

function activeNodes(program) {
  const activeNodes = nodeConfig => {
    const activeNodes = [];

    Object.keys(nodeConfig).forEach(host => {
      const ports = nodeConfig[host];

      ports.forEach(port => {
        const web3 = tryWeb3(host, port);
        if (web3) {
          activeNodes.push({
            host,
            port,
            web3
          });
        }
      });
    });

    return activeNodes;
  };

  return activeNodes(nodeSpecifier(program)).map(node => ethTools.inspectNode(node));
}

function info() {
  console.log(screenOutput.info(activeNodes(program)));
}

function balance(address) {
  activeNodes(program).forEach(node => {
    console.log();
    console.log(screenOutput.info([node]));
    console.log(`${colors.yellow('Address')} ${address}: ${colors.cyan(ethTools.balance(node, address))} ΞTH`);
  });
}

function attach() {
  const nodes = activeNodes(program);
  if (nodes.length > 0) {
    const node = nodes[0];

    // doesn't work !
    exec(`geth attach http://${node.host}:${node.port}`, (err, stdout, stderr) => {
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  }
}

program
  .version(pkg.version)
  .description('Eth command line tools')
  .option('--host <host>', '[Config]: Host of Ethereum node')
  .option('-p, --port <port>', '[Config]: Port on which the node is running');

program
  .command('info')
  .description('show the accessible nodes info (nodes are specified in config file)')
  .action((cmd, env) => {
    info();
  });

program
  .command('balance [address]')
  .description('get the balance on a given address')
  .action((address, env) => {
    balance(address);
  });

// program
//   .command('attach')
//   .description('enter node.js console with web3 object ready for interaction')
//   .action((cmd, env) => {
//     attach();
//   });

program.parse(process.argv);

if (program.args.length === 0) {
  info();
  console.log(colors.gray('Use -h option for more eth-tools commands.'));
}
