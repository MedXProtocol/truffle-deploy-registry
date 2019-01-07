var path = require('path')
var config = require('./config')

module.exports = function (networkId) {
  return path.join(config.getNetworksPath(), '' + networkId + '.json')
}
