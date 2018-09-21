const config = require('../config')

describe('config', () => {
  describe('getNetworksPath()', () => {
    it('should use the process.cwd() if no override', () => {
      expect(config.getNetworksPath()).toEqual(process.cwd())
    })
  })
})
