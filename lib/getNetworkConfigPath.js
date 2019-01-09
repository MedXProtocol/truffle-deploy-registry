var path = require('path')

var config = require('./config')

// getNetworkConfigPath()
//
// Returns the file path using the configured networksPath (or it's default)
// and the name of the networks JSON file
//
module.exports = function (networkId) {
  return path.join(config.getNetworksPath(), `${networkId}.json`)
}
