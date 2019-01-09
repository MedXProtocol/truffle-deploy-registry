module.exports = function (contractName, networkConfig) {
  for (let i = networkConfig.length - 1; i >= 0; i--) {
    const entry = networkConfig[i]

    if (entry.contractName === contractName) {
      return entry
    }
  }

  return null
}
