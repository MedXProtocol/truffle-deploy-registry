var mostRecentEntryByContractName = require('./mostRecentEntryByContractName')

module.exports = async function (network, networkConfigs) {
  var { contractName } = network
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
    ...network,
    networks: {
      ...network.networks,
      ...newNetworks
    }
  }
}
