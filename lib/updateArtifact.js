const readAllNetworkConfigs = require('./readAllNetworkConfigs')
const mostRecentEntryByContractName = require('./mostRecentEntryByContractName')

module.exports = async function (artifact, networkConfigs) {
  if (!networkConfigs) {
    networkConfigs = await readAllNetworkConfigs()
  }
  const { contractName } = artifact
  const newNetworks = {}
  for (var networkId in networkConfigs) {
    const networkConfig = networkConfigs[networkId]
    const entry = mostRecentEntryByContractName(contractName, networkConfig)
    if (entry) {
      newNetworks[networkId] = {
        events: {},
        links: {},
        address: entry.address,
        transactionHash: ''
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
