var path = require('path')

const DEFAULT_NETWORKS_PATH = path.join('networks')
const DEFAULT_OUTPUT_PATH   = path.join('build', 'contracts')
const DEFAULT_INPUT_PATH    = DEFAULT_OUTPUT_PATH

let networkId,
  networksPath,
  artifactsInputPath,
  artifactsOutputPath

module.exports = {
  resetConfig: function () {
    networkId = undefined
    networksPath = DEFAULT_NETWORKS_PATH
    artifactsInputPath = DEFAULT_INPUT_PATH
    artifactsOutputPath = DEFAULT_OUTPUT_PATH
  },

  setNetworksPath: function (path) {
    networksPath = path
  },

  getNetworksPath: function () {
    return networksPath || DEFAULT_NETWORKS_PATH
  },

  setInputArtifactsPath: function (path) {
    artifactsInputPath = path
  },

  getInputArtifactsPath: function () {
    return artifactsInputPath || DEFAULT_INPUT_PATH
  },

  setOutputArtifactsPath: function (path) {
    artifactsOutputPath = path
  },

  getOutputArtifactsPath: function () {
    return artifactsOutputPath || DEFAULT_OUTPUT_PATH
  }
}
