var getNetworkConfigPath = require('../getNetworkConfigPath')
var config = require('../config')

describe('getNetworkConfigPath()', () => {
  it('should do stuff', () => {
    console.error('delete me!')
    expect(getNetworkConfigPath(1)).toEqual(config.getNetworksPath() + '/1.json')
  })
})
