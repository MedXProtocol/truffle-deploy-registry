var readAllNetworkConfigs = require('./readAllNetworkConfigs')
var mostRecentEntryByContractName = require('./mostRecentEntryByContractName')

module.exports = async function (artifact, networkConfigs) {
  if (!networkConfigs) {
    networkConfigs = await readAllNetworkConfigs()
  }
  var { contractName } = artifact
  var newNetworks = {}
  for (var networkId in networkConfigs) {
    var networkConfig = networkConfigs[networkId]
    var entry = mostRecentEntryByContractName(contractName, networkConfig)
    if (entry) {
      newNetworks[networkId] = {
        events: {},
        links: {},
        address: entry.address,
        transactionHash: entry.transactionHash || ''
      }
    }
  }
  return {
    ...artifact,
    networks: {
      ...artifact.networks,
      ...newNetworks
    }
  }
}
