var getNetworkConfigPath = require('../getNetworkConfigPath')
var config = require('../config')

describe('getNetworkConfigPath()', () => {
  it('should return the proper path', () => {
    expect(
      getNetworkConfigPath(1)
    ).toEqual(
      config.getNetworksPath() + '/1.json'
    )
  })
})
