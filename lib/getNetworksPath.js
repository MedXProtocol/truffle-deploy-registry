var path = require('path')
var config = require('./config')

module.exports = function () {
  return path.join(config.getNetworksPath(), 'networks')
}
