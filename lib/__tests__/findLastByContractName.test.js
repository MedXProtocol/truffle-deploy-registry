var path = require('path')
var config = require('../config')
var findLastByContractName = require("../findLastByContractName")

describe('findLastByContractName()', () => {
  beforeEach(() => {
    var tempDir = path.join(__dirname, '..', '__stubs__')
    config.overrideNetworksPath(tempDir)
  })

  it('should retrieve the last entry with the contract name', async () => {
    const entry = await findLastByContractName('2', 'Contract2')
    expect(entry).toEqual({"address": "0x4444", "contractName": "Contract2"})
  })
})
