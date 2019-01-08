var chalk = require('chalk')
var fs = require('fs')
var readNetworkConfig = require('./readNetworkConfig')
var util = require('util')
var path = require('path')
var config = require('./config')

var exists = util.promisify(fs.exists)
var readdir = util.promisify(fs.readdir)

module.exports = async function () {
  var networkConfigs = {}
  var networksPath = config.getNetworksPath()

  if (!(await exists(networksPath))) {
    console.log(chalk.red('Artifacts directory missing!'))

    return {}
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
