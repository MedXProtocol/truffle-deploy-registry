var append = require('./append')
var appendContract = require('./appendContract')
var appendInstance = require('./appendInstance')
var isDryRunNetworkName = require('./isDryRunNetworkName')
var findLastByContractName = require('./findLastByContractName')

module.exports = {
  append,
  appendContract,
  appendInstance,
  findLastByContractName,
  isDryRunNetworkName
}
