let networkId = null
let networksPath = null

module.exports = {
  overrideNetworksPath: function (path) {
    networksPath = path
  },

  getNetworksPath: function () {
    return networksPath || process.cwd()
  }
}
