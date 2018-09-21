const fs = require('fs')
const getNetworksPath = require('./getNetworksPath')
const readNetworkConfig = require('./readNetworkConfig')
const util = require('util')
const path = require('path')

const exists = util.promisify(fs.exists)
const readdir = util.promisify(fs.readdir)

module.exports = async function () {
  const networkConfigs = {}
  const networksPath = getNetworksPath()
  if (!(await exists(networksPath))) { return {} }
  const networkConfigsPromises = (await readdir(networksPath)).map(async function (networkJsonFilename) {
    const match = /(\w+).json/.exec(networkJsonFilename)
    if (match) {
      const networkId = match[1]
      return readNetworkConfig(path.join(networksPath, networkJsonFilename)).then(config => {
        networkConfigs[networkId] = config
      })
    }
  })
  await Promise.all(networkConfigsPromises)
  return networkConfigs
}
