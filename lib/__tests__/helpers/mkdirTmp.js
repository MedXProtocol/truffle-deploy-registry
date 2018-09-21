const path = require('path')
const os = require('os')
const fs = require('fs')

module.exports = function () {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'truffle-deploy-registry-'))
}
