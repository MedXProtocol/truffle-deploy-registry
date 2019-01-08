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
    return {}
  }

  var networkConfigsPromises = (await readdir(networksPath)).map(async function (networkJsonFilename) {
    var match = /(\d+).json/.exec(networkJsonFilename)
    console.log('match', match)

    if (match) {
      var networkId = match[1]
      console.log('networkId', networkId)

      return readNetworkConfig(path.join(networksPath, networkJsonFilename)).then(config => {
        console.log('config', config)

        networkConfigs[networkId] = config
        console.log(networkConfigs)
      })
    }
  })

  await Promise.all(networkConfigsPromises)

  return networkConfigs
}
