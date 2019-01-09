var getNetworkConfigPath = require('./getNetworkConfigPath')
var readNetworkConfig = require('./readNetworkConfig')
var writeNetworkConfig = require('./writeNetworkConfig')

// append()
//
// This determines which file to write to and passes the new content along
//
module.exports = async function add(networkId, entry) {
  if (!entry.contractName) {
    throw new Error('An entry must have a \'contractName\'')
  }

  if (!entry.address) {
    throw new Error('An entry must have an \'address\'')
  }

  const networkConfigPath = getNetworkConfigPath(networkId)
  const networkConfig = await readNetworkConfig(networkConfigPath)
  const newNetworkConfig = networkConfig.concat([entry])

  await writeNetworkConfig(newNetworkConfig, networkConfigPath)
}
