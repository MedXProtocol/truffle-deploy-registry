const path = require('path')
const config = require('./config')

module.exports = function () {
  return path.join(config.getNetworksPath(), 'networks')
}
