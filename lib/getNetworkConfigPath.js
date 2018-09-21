var path = require('path')
var getNetworksPath = require('./getNetworksPath')

module.exports = function (networkId) {
  return path.join(getNetworksPath(), '' + networkId + '.json')
}
