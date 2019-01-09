var fs = require('fs')
var util = require('util')

var readFile = util.promisify(fs.readFile)
var exists = util.promisify(fs.exists)

module.exports = function (networkConfigPath) {
  return exists(networkConfigPath).then(exists => {
    if (exists) {
      return readFile(networkConfigPath, { encoding: 'utf8' }).then(networkConfigJson => {
        var result = []

        if (networkConfigJson) {
          result = JSON.parse(networkConfigJson)
        }

        return result
      })
    } else {
      return []
    }
  })
}
