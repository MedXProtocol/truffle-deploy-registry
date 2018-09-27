var fs = require('fs')
var getNetworksPath = require('./getNetworksPath')
var readNetworkConfig = require('./readNetworkConfig')
var util = require('util')
var path = require('path')

var exists = util.promisify(fs.exists)
var readdir = util.promisify(fs.readdir)

module.exports = async function () {
  var networkConfigs = {}
  var networksPath = getNetworksPath()
  if (!(await exists(networksPath))) { return {} }
  var networkConfigsPromises = (await readdir(networksPath)).map(async function (networkJsonFilename) {
    var match = /(\d+).json/.exec(networkJsonFilename)
    if (match) {
      var networkId = match[1]
      return readNetworkConfig(path.join(networksPath, networkJsonFilename)).then(config => {
        networkConfigs[networkId] = config
      })
    }
  })
  await Promise.all(networkConfigsPromises)
  return networkConfigs
}
