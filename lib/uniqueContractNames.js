// uniqueContractNames(networkConfigs)
//
// Takes the result of readAllNetworkConfigs (as the passed in param
// networkConfigs) and returns a unique array of all of the contract names inspect
// from all of the network files.
//
// Example return:
// [
//   'Migrations',
//   'SimpleToken'
// ]
//
module.exports = function (networkConfigs) {
  let contractNames = []

  for (let networkId in networkConfigs) {
    const networkConfig = networkConfigs[networkId]

    for (let i = networkConfig.length - 1; i >= 0; i--) {
      const entry = networkConfig[i]

      contractNames.push(
        entry.contractName
      )
    }
  }

  return contractNames.filter(
    (value, index, array) => (array.indexOf(value) === index)
  )
}
