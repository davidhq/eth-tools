const colors = require('colors');
const Table = require('cli-table3');
const moment = require('moment');

module.exports = {
  info(nodes) {
    const table = new Table({
      chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' }
    });

    const headers = ['host', 'client', 'version', 'port', 'latest block', 'when', 'up to date?'].map(column => colors.yellow(column));

    const rows = nodes.map(node => {
      let mark;
      if (node.isRecent) {
        mark = colors.green(' ✓');
      } else if (node.isOld) {
        mark = colors.red(' ✗');
      } else {
        mark = '-';
      }

      return [
        colors.green(node.host),
        colors.cyan(node.client),
        node.version,
        colors.green(node.port),
        node.blockNumber,
        moment(node.latestBlockDate).fromNow(),
        mark
      ];
    });

    if (rows.length > 0) {
      table.push(headers);
      rows.forEach(row => table.push(row));
    }

    return table.toString();
  }
};
