const fs = require('fs')
const getNetworkConfigPath = require('./getNetworkConfigPath')
const path = require('path')
const mkdirp = require('mkdirp')
const util = require('util')

const writeFile = util.promisify(fs.writeFile)

module.exports = function (object, networkConfigPath) {
  const json = JSON.stringify(object, null, 2)
  mkdirp.sync(path.dirname(networkConfigPath))
  return writeFile(networkConfigPath, json, 'utf8')
}
