var chalk = require('chalk')
var fs = require('fs')
var util = require('util')
var path = require('path')
var config = require('./config')

var readNetworkConfig = require('./readNetworkConfig')

var exists = util.promisify(fs.exists)
var readdir = util.promisify(fs.readdir)

module.exports = async function (networksPath) {
  var networkConfigs = {}

  if (!(await exists(networksPath))) {
    console.log(chalk.red(`Networks directory "${networksPath}" missing!`))
    console.log(chalk.red(`This library won't work properly without a "${networksPath}" path to operate on`))

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
