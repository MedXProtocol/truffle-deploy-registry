var getNetworkConfigPath = require('../getNetworkConfigPath')
var config = require('../config')

describe('getNetworkConfigPath()', () => {
  it('should do stuff', () => {
    expect(getNetworkConfigPath(1)).toEqual(config.getNetworksPath() + '/networks/1.json')
  })
})
