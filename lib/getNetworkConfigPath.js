const path = require('path')
const getNetworksPath = require('./getNetworksPath')

module.exports = function (networkId) {
  return path.join(getNetworksPath(), '' + networkId + '.json')
}
