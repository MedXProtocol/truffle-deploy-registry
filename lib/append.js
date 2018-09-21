const config = require('./config')
const getNetworkConfigPath = require('./getNetworkConfigPath')
const readNetworkConfig = require('./readNetworkConfig')
const writeNetworkConfig = require('./writeNetworkConfig')

module.exports = async function add(networkId, entry) {
  if (!entry.contractName) {
    throw new Error('An entry must have an \'contractName\'')
  }
  if (!entry.address) {
    throw new Error('An entry must have an \'address\'')
  }
  if (!networkId) {
    throw new Error('You must pass the integer network id')
  }

  const networkConfigPath = getNetworkConfigPath(networkId)
  const networkConfig = await readNetworkConfig(networkConfigPath)
  const newNetworkConfig = networkConfig.concat([entry])
  await writeNetworkConfig(newNetworkConfig, networkConfigPath)
}
