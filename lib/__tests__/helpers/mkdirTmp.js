var path = require('path')
var os = require('os')
var fs = require('fs')

module.exports = function () {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'truffle-deploy-registry-'))
}
