const Web3 = require('web3');

module.exports = function tryWeb3(host, port) {
  const web3 = new Web3();
  web3.setProvider(new web3.providers.HttpProvider(`http://${host}:${port}`));
  try {
    const dummy = web3.version.node;
    return web3;
  } catch (e) {}
  return false;
};
