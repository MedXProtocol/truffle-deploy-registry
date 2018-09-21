var readNetworkConfig = require('../readNetworkConfig')
var path = require('path')
var NETWORK_CONFIG_PATH = path.dirname(__dirname) + '/__stubs__/1.json'

describe('readNetworkConfig()', () => {
  it('should read an existing config', async () => {
    expect(await readNetworkConfig(NETWORK_CONFIG_PATH)).toEqual(
      [
        { contractName: "Contract", address: "addy" }
      ]
    )
  })

  it('should gracefully handle a non-existent config', async () => {
    expect(await readNetworkConfig('/alsdf/asdlfkaj/afeljk')).toEqual([])
  })
})
