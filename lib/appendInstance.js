var append = require('./append')

module.exports = async function (networkId, contractInstance) {
  await append(networkId, {
    contractName: contractInstance._json.contractName,
    address: contractInstance.address,
    transactionHash: contractInstance.transactionHash
  })
}
