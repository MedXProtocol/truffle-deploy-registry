var append = require('./append')

module.exports = async function (contractInstance) {
  const networkId = contractInstance.constructor.network_id
  const contractName = contractInstance.constructor._json.contractName
  const address = contractInstance.address
  const transactionHash = contractInstance.transactionHash

  await append(networkId, {
    contractName,
    address,
    transactionHash
  })
}
