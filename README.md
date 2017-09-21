# Eth Tools

Command line tools for easy interaction with Ethereum nodes.

At the moment:
 - Ethereum node detection
 - account balance inspector

more coming as needs arise.

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

Help:

``eth -h``

## Configure

Create or edit the file `~/.eth-tools.json` (Linux/MacOS: */home/[user]*, Windows: *c:\\Users\\[user]*) containing instructions where to search for Ethereum nodes.

### Config file example
```
{
  "clients": ["geth", "parity", "testrpc"],
  "nodes": {
    "localhost": [8545, 8600, 8700],
    "some_host.com": [8545]
  }
}
```

### Options

```
Usage: eth [options] [command]


  Commands:

    info               show the accessible nodes info (nodes are specified in config file)
    balance [address]  get the balance on a given address

  Eth command line tools

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    --host <host>      [Config]: Host of Ethereum node
    -p, --port <port>  [Config]: Port on which the node is running
```

### Note

If you run `eth` without this file present, it will create an example file for your convenience.


## Notes

- Ethereum nodes have to have RPC enabled on the given port (parity has by default, geth doesn't - use `--rpc`)
