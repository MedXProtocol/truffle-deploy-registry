var getNetworkConfigPath = require('./getNetworkConfigPath')
var readNetworkConfig = require('./readNetworkConfig')
var mostRecentEntryByContractName = require('./mostRecentEntryByContractName')

// findLastByContractName(networkId, contractName)
//
// Gets the most recent contract when provided a network ID and contract name
//
// returns:
// {
//   "contractName": "SimpleToken",
//   "address": "0x8f0483125fcb9aaaefa9209d8e9d7b9c8b9fb90f",
// }
//
module.exports = async function (networkId, contractName) {
  const networkConfig = await readNetworkConfig(getNetworkConfigPath(networkId))

  return mostRecentEntryByContractName(contractName, networkConfig)
}
