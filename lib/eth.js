#!/usr/bin/env node
const colors = require('colors');
const moment = require('moment');
const tryWeb3 = require('./tryWeb3');
const table = require('table').table;
const fs = require('fs');
const path = require('path');
const homedir = require('homedir');

let exampleConfigFile = path.join(__dirname, '../config/config-example.json');
let configFile = path.join(homedir(), '.eth-tools.json');

if (!fs.existsSync(configFile)) {
  fs.writeFileSync(configFile, fs.readFileSync(exampleConfigFile));

  console.log(`${colors.red(`Info:`)} Created example config file ${colors.yellow(configFile)}, please edit it...`);
}

const config = JSON.parse(fs.readFileSync(configFile));

function latestBlock(web3) {
  return new Date(web3.eth.getBlock(web3.eth.blockNumber).timestamp * 1000);
}

function isRecent(web3) {
  return (Date.now() - latestBlock(web3)) / 1000.0 < 60;
}

function isOld(web3) {
  return (Date.now() - latestBlock(web3)) / 1000.0 > 86400;
}

function inquireForClients(host, ports, silent = true) {
  let header = ['client', 'version', 'port', 'latest block', 'up-to-date'];

  header = header.map(column => colors.yellow(column));

  return [header].concat(
    ports.reduce((rows, port) => {
      let web3 = tryWeb3(host, port);
      if (web3) {
        row = [];

        const mark = isRecent(web3) ? colors.green(' ✓') : isOld(web3) ? colors.red(' ✗') : '-';
        const version = web3.version.node;

        let client = config.client.idents.find(client => version.match(new RegExp(client, 'i')));

        row.push(colors.cyan(client));
        row.push(colors.gray(version));
        row.push(colors.green(port));
        row.push(colors.gray(moment(latestBlock(web3)).fromNow()));
        row.push(mark);

        return rows.concat([row]);
      } else {
        return rows;
      }
    }, [])
  );
}

console.log();

let port = process.argv[2];

if (port) {
  const host = 'localhost';
  console.log(colors.magenta(`${host}:`));
  let output = table(inquireForClients(host, [port], false));
  console.log(output);
} else {
  Object.keys(config.client.hosts).forEach(host => {
    console.log(colors.magenta(`${host}:`));

    let ports = config.client.hosts[host];

    let output = table(inquireForClients(host, ports));
    console.log(output);
  });
}
