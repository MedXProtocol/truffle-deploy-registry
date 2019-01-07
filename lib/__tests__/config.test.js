var path = require('path')
var config = require('../config')

describe('config', () => {
  describe('getNetworksPath()', () => {
    it('should use the process.cwd() and "/networks" if no override', () => {
      expect(config.getNetworksPath()).toEqual(
        path.join(process.cwd(), 'networks')
      )
    })
  })
})
