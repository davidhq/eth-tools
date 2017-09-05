# eth-tools

Command line tools for easy interaction with Ethereum nodes.

At the moment only Ethereum node detection is available, more coming very soon.

## Prerequisites

**Summary:** `node.js` and `git`. You can skip to the next section if you already have these.

- [node.js](https://nodejs.org/en/download/) spectacular platform. LTS (Long-term support) is the right choice for most.

- [git](https://git-scm.com/downloads) incredible version control (needed in the background to install some dependencies on first install).

**Optional:** if you want easy switching between different `node.js` versions in the future and you are using **unix based systems** (macOS, Linux), you can install `node.js` via fantastic [n](https://github.com/tj/n) (don't download it from *nodejs.org* in this case).

You can also install both `node.js` and `git` via [Homebrew](https://brew.sh) friendly package manager for macOS. [n](https://github.com/tj/n) is still recommended for `node.js` though.

[npm](https://www.npmjs.com) (Node Package Manager) is installed automatically with `node.js` install (just FYI).

## Install

``npm install -g eth-tools``

## Run

``eth``

## Configure

Create or edit the file `~/.eth-tools.json` (Linux/MacOS: */home/[user]*, Windows: *c:\\Users\\[user]*) containing instructions where to search for Ethereum nodes.

### Config file example
```
{
  "client": {
    "idents": ["geth", "parity", "testrpc"],
    "hosts": {
      "localhost": [8545, 8600, 8700],
      "some_host.com": [8545]
    }
  }
}
```

### Note

If you run `eth` without this file present, it will create an example file for your convenience.

## Example output
```
localhost:
╔═════════╤═══════════════════════════════════════════════════════════════╤══════╤═══════════════════╤════════════╗
║ client  │ version                                                       │ port │ latest block      │ up-to-date ║
╟─────────┼───────────────────────────────────────────────────────────────┼──────┼───────────────────┼────────────╢
║ geth    │ Geth/v1.6.7-stable/darwin-amd64/go1.8.3                       │ 8545 │ a month ago       │  ✗         ║
╟─────────┼───────────────────────────────────────────────────────────────┼──────┼───────────────────┼────────────╢
║ parity  │ Parity//v1.7.0-beta-5f2cabd-20170727/x86_64-macos/rustc1.18.0 │ 8600 │ a few seconds ago │  ✓         ║
╟─────────┼───────────────────────────────────────────────────────────────┼──────┼───────────────────┼────────────╢
║ testrpc │ EthereumJS TestRPC/v1.1.1/ethereum-js                         │ 8700 │ a few seconds ago │  ✓         ║
╚═════════╧═══════════════════════════════════════════════════════════════╧══════╧═══════════════════╧════════════╝

some_host.com:
╔════════╤════════════════════════════════════════╤══════╤═══════════════════╤════════════╗
║ client │ version                                │ port │ latest block      │ up-to-date ║
╟────────┼────────────────────────────────────────┼──────┼───────────────────┼────────────╢
║ geth   │ Geth/v1.6.7-stable/linux-amd64/go1.7.5 │ 8545 │ a few seconds ago │  ✓         ║
╚════════╧════════════════════════════════════════╧══════╧═══════════════════╧════════════╝
```

## Notes

- Ethereum nodes have to have RPC enabled on the given port (parity has by default, geth doesn't - use `--rpc`)
