var getNetworkConfigPath = require('./getNetworkConfigPath')
var readNetworkConfig = require('./readNetworkConfig')
var mostRecentEntryByContractName = require('./mostRecentEntryByContractName')

module.exports = async function (networkId, contractName) {
  var networkConfig = await readNetworkConfig(getNetworkConfigPath(networkId))
  return mostRecentEntryByContractName(contractName, networkConfig)
}
