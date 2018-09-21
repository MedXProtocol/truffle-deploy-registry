const path = require('path')
const mkdirTmp = require('./helpers/mkdirTmp')
const readAllNetworkConfigs = require('../readAllNetworkConfigs')
const config = require('../config')
const debug = require('debug')

describe('readAllNetworkConfigs()', () => {
  it('should load the networks', async () => {
    const tempDir = path.join(__dirname, '..', '__stubs__')
    config.overrideNetworksPath(tempDir)

    expect(await readAllNetworkConfigs()).toEqual({
      2: [
        { "contractName": "Contract1", "address": "0x1111" },
        { "contractName": "Contract2", "address": "0x2222" },
        { "contractName": "Contract3", "address": "0x3333" },
        { "contractName": "Contract2", "address": "0x4444" },
        { "contractName": "Contract1", "address": "0x5555" }
      ],
      3: [
        { "contractName": "Contract2", "address": "addy" }
      ]
    })
  })

  it('should handle missing directories', async () => {
    config.overrideNetworksPath('some/other/test')
    expect(await readAllNetworkConfigs()).toEqual({})
  })
})
