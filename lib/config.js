var path = require('path')

let networkId = null
let networksPath = null

module.exports = {
  overrideNetworksPath: function (path) {
    networksPath = path
  },

  getNetworksPath: function () {
    return networksPath || path.join(process.cwd(), 'networks')
  }
}
