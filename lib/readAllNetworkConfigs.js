var fs = require('fs')
var readNetworkConfig = require('./readNetworkConfig')
var util = require('util')
var path = require('path')
var config = require('./config')

var exists = util.promisify(fs.exists)
// var mkdirSync = util.promisify(fs.mkdirSync)
var mkdirp = require('mkdirp')

var readdir = util.promisify(fs.readdir)

module.exports = async function () {
  var networkConfigs = {}
  var networksPath = config.getNetworksPath()

  if (!(await exists(networksPath))) {
    mkdirp.sync(path.dirname(networksPath))
    // mkdirSync(networksPath, { recursive: true })
  }

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
