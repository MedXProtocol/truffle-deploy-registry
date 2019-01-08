var path = require('path')
var config = require('../config')

describe('config', () => {
  describe('getNetworksPath()', () => {
    it('should use "/networks" if no override', () => {
      expect(config.getNetworksPath()).toEqual(
        path.join('networks')
      )
    })
  })
})
