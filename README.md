# Truffle Deploy Registry

[![Coverage Status](https://coveralls.io/repos/github/MedCredits/truffle-deploy-registry/badge.svg?branch=master)](https://coveralls.io/github/MedCredits/truffle-deploy-registry?branch=master) [![Tests](https://travis-ci.org/MedCredits/truffle-deploy-registry.svg?branch=master)](https://travis-ci.org/MedCredits/truffle-deploy-registry)

Store deployed contract addresses separately from Truffle artifacts, and merge the addresses into artifacts.

This module is a complete re-write (with comprehensive tests!) of [truffle-migrate-off-chain](https://github.com/asselstine/truffle-migrate-off-chain)

# Motivation

Truffle is a fantastic tool for creating and deploying smart contracts.   I wanted a way to commit deployed contract addresses as part of the repository without committing the Truffle artifacts, as they contain paths specific to the developer's filesystem.

Having the addresses separated by network allows us to ignore the local environment but commit the testnet and mainnet environments to the repository.  Our continuous deployment server can then re-compile the artifacts and merge in the deployed addresses.

# Setup

```
$ npm install --save-dev truffle-deploy-registry
```

# Usage

Truffle Deploy Registry works in two stages:

1. New deployment entries are recorded in a network-specific JSON file.
2. The latest deployment entries are merged with the truffle artifacts after compilation.

## 1. Network files

Truffle Deploy Registry stores contract addresses in JSON files in the `networks/` directory.  For example, if you deploy to `mainnet` and `ropsten` your networks directory may look like:

```
networks/
  1.json
  3.json
```

Each of these files contains an array of deployment entries.  New entries are appended.  Each entry must store the contractName and address, but is otherwise unstructured so that the user can add additional information.  A network config looks something like:

```
# networks/1.json
[
  { contractName: 'Ownable', address: '0x3383c29542b8c96eafed98c4aafe789ddb256e19' },
  { contractName: 'Registry', address: '0x8fa5944b15c1ab5db6bcfb0c888bdc6b242f0fa6' }
]
```

To add new entries, call the `append` function:

```javascript
// migrations/1_initial_migration.js

var append = require('truffle-deploy-registry').append
var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network) {
  deployer.deploy(Migrations).then(() => {
    return append(deployer.network_id, { contractName: 'Migrations', address: Migrations.address })
  })
}
```

## 2. Merging network addresses into artifacts

After Truffle compiles your smart contracts, you can merge the deployed addresses into the artifact by calling `apply-registry` with the path to the artifacts.

```sh
$ apply-registry build/contracts
```

This will pull in all of the network configs and add *the most recent* address for each contract by name from each configuration.  For example, if you have two configs:

```
networks/
  1.json
  3.json
```

`1.json`:

```json
[
  { "contractName": "Contract2", "address": "0x2222222222222222222222222222222222222222" },
  { "contractName": "Contract2", "address": "0x4444444444444444444444444444444444444444" },
]
```

`3.json`:

```json
[
  { "contractName": "Contract2", "address": "0x8888888888888888888888888888888888888888" }
]
```

`build/contracts/Contract2.json`:

```json
{
  "contractName": "Contract2",
  "abi": [],
  "networks": {
    "2": {
      "events": {},
      "links": {},
      "address": "0x3383c29542b8c96eafed98c4aafe789ddb256e19",
      "transactionHash": "0xbef1787981c4512c8bc8acf59e6cbe9c23c9c5ea269b193ec71aae9f9c57c997"
    }
  },
  "updatedAt": "2018-09-19T21:37:52.903Z"
}
```

Then run `apply-registry`:

```sh
$ apply-registry build/contracts
```

Your artifact will now be updated with the networks:

`build/contracts/Contract2.json`:

```json
{
  "contractName": "Contract2",
  "abi": [],
  "networks": {
    "1": {
      "events": {},
      "links": {},
      "address": "0x4444444444444444444444444444444444444444",
      "transactionHash": ""
    },
    "2": {
      "events": {},
      "links": {},
      "address": "0x3383c29542b8c96eafed98c4aafe789ddb256e19",
      "transactionHash": "0xbef1787981c4512c8bc8acf59e6cbe9c23c9c5ea269b193ec71aae9f9c57c997"
    },
    "3": {
      "events": {},
      "links": {},
      "address": "0x8888888888888888888888888888888888888888",
      "transactionHash": ""
    },
  },
  "updatedAt": "2018-09-19T21:37:52.903Z"
}
```

If you wish, you may also determine the output directory using the second argument:

```sh
$ apply-registry build/contracts build/output
```

And the merged artifacts will appear in `build/output`.

I recommend you create a new script entry in `package.json` so that you can easily combine compilation with merging:

```json
{
  "scripts": {
    "compile": "truffle compile && apply-registry build/contracts"
  }
}
```

# Future Work

Eventually it would be best to create entirely separate artifacts that include the bytecode and abi, rather than having to merge into the compiled artifact.  Another possibility is to integrate with EthPM and treat each deployment as a package.
