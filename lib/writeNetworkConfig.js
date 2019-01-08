var fs = require('fs')
var getNetworkConfigPath = require('./getNetworkConfigPath')
var path = require('path')
var mkdirp = require('mkdirp')
var util = require('util')

var writeFile = util.promisify(fs.writeFile)

// writeNetworkConfig()
//
// This function is only used when the library is called programmatically (ie.
// via node js from a migration file, etc)
//
module.exports = function (object, networkConfigPath) {
  var json = JSON.stringify(object, null, 2)

  mkdirp.sync(path.dirname(networkConfigPath))

  return writeFile(networkConfigPath, json, 'utf8')
}
