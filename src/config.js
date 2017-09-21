const fs = require('fs');
const path = require('path');
const homedir = require('homedir');
const colors = require('colors');

const exampleConfigFile = path.join(__dirname, './config/config-example.json');
const configFile = path.join(homedir(), '.eth-tools.json');

if (!fs.existsSync(configFile)) {
  fs.writeFileSync(configFile, fs.readFileSync(exampleConfigFile));

  console.log(`${colors.red(`Info:`)} Created example config file ${colors.yellow(configFile)}, please edit it...`);
}

module.exports = JSON.parse(fs.readFileSync(configFile));
