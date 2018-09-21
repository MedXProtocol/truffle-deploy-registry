const append = require('../append')
const fs = require('fs')
const mkdirTmp = require('./helpers/mkdirTmp')
const config = require('../config')
const getNetworkConfigPath = require('../getNetworkConfigPath')
const readNetworkConfig = require('../readNetworkConfig')

const NETWORK_ID = 1111

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
    const entry = { contractName: 'foo', address: 'bar' }
    await append(NETWORK_ID, entry)
    expect(await readNetworkConfig(getNetworkConfigPath(NETWORK_ID))).toEqual(
      [entry]
    )
    const entry2 = { contractName: 'blarg', address: 'hooha'}
    await append(NETWORK_ID, entry2)
    expect(await readNetworkConfig(getNetworkConfigPath(NETWORK_ID))).toEqual(
      [entry, entry2]
    )
  })
})
