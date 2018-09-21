var fs = require('fs')
var getNetworkConfigPath = require('./getNetworkConfigPath')
var path = require('path')
var mkdirp = require('mkdirp')
var util = require('util')

var writeFile = util.promisify(fs.writeFile)

module.exports = function (object, networkConfigPath) {
  var json = JSON.stringify(object, null, 2)
  mkdirp.sync(path.dirname(networkConfigPath))
  return writeFile(networkConfigPath, json, 'utf8')
}
