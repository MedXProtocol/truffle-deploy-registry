var append = require('./append')

module.exports = async function (networkId, contract) {
  await append(networkId, { contractName: contract.contractName, address: contract.address })
}
