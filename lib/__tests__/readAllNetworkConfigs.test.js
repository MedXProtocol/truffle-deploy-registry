var path = require('path')
var readAllNetworkConfigs = require('../readAllNetworkConfigs')
var config = require('../config')
var debug = require('debug')

describe('readAllNetworkConfigs()', () => {
  it('should load the networks', async () => {
    var tempDir = path.join(__dirname, '..', '__stubs__', 'networks')
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
    config.overrideNetworksPath(
      path.join(process.cwd(), 'some', 'other', 'test')
    )
    expect(await readAllNetworkConfigs()).toEqual({})
  })
})
