var config = require('./config')
var getNetworkConfigPath = require('./getNetworkConfigPath')
var readNetworkConfig = require('./readNetworkConfig')
var writeNetworkConfig = require('./writeNetworkConfig')

module.exports = async function add(networkId, entry) {
  if (!entry.contractName) {
    throw new Error('An entry must have a \'contractName\'')
  }
  if (!entry.address) {
    throw new Error('An entry must have an \'address\'')
  }
  if (!networkId) {
    throw new Error('You must pass the network id as an integer')
  }

  var networkConfigPath = getNetworkConfigPath(networkId)
  var networkConfig = await readNetworkConfig(networkConfigPath)
  var newNetworkConfig = networkConfig.concat([entry])

  await writeNetworkConfig(newNetworkConfig, networkConfigPath)
}
