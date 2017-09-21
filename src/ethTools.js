const config = require('./config');

module.exports = {
  inspectNode(node) {
    const version = node.web3.version.node;
    const client = config.clients.find(c => version.match(new RegExp(c, 'i')));

    return Object.assign(node, {
      version,
      client,
      latestBlockDate: this.latestBlockDate(node),
      isRecent: this.isRecent(node),
      isOld: this.isOld(node),
      getBalance: address => this.getBalance(node, address)
    });
  },

  latestBlockDate(node) {
    return new Date(node.web3.eth.getBlock(node.web3.eth.blockNumber).timestamp * 1000);
  },

  isRecent(node) {
    return (Date.now() - this.latestBlockDate(node)) / 1000.0 < 60;
  },

  isOld(node) {
    return (Date.now() - this.latestBlockDate(node)) / 1000.0 > 86400;
  },

  balance(node, address) {
    return node.web3.fromWei(node.web3.eth.getBalance(address).toNumber(), 'ether');
  }
};
