module.exports = function (contractName, networkConfig) {
  for (var i = networkConfig.length - 1; i >= 0; i--) {
    var entry = networkConfig[i]
    if (entry.contractName === contractName) {
      return entry
    }
  }
  return null
}
