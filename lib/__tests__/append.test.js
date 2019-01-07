var append = require('../append')
var fs = require('fs')
var mkdirTmp = require('./helpers/mkdirTmp')
var config = require('../config')
var getNetworkConfigPath = require('../getNetworkConfigPath')
var readNetworkConfig = require('../readNetworkConfig')

var NETWORK_ID = 1111

describe('append()', () => {
  let tempDir

  beforeAll(() => {
    tempDir = mkdirTmp()
    config.overrideNetworksPath(tempDir)
  })

  afterAll(() => {
    fs.rmdirSync(tempDir)
  })

  it('should validate the entry', () => {
    expect(append(NETWORK_ID, { contractName: 'test' })).rejects.toEqual(new Error('An entry must have an \'address\''))
    expect(append(NETWORK_ID, { address: 'test' })).rejects.toEqual(new Error('An entry must have an \'contractName\''))
  })

  it('should add the entry', async () => {
    var entry = { contractName: 'foo', address: 'bar', transactionHash: '0x1111' }
    await append(NETWORK_ID, entry)
    expect(await readNetworkConfig(getNetworkConfigPath(NETWORK_ID))).toEqual(
      [entry]
    )

    var entry2 = { contractName: 'blarg', address: 'hooha'}
    await append(NETWORK_ID, entry2)
    expect(await readNetworkConfig(getNetworkConfigPath(NETWORK_ID))).toEqual(
      [entry, entry2]
    )
  })
})
