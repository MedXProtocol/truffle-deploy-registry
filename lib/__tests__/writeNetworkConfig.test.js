const writeNetworkConfig = require('../writeNetworkConfig')
const path = require('path')
const fs = require('fs')
const mkdirTmp = require('./helpers/mkdirTmp')

describe('writeNetworkConfig()', () => {
  let tempDir

  beforeAll(() => {
    tempDir = mkdirTmp()
  })

  afterAll(() => {
    fs.rmdirSync(tempDir)
  })

  it('should do stuff', async () => {
    const networkConfigPath = path.join(tempDir, 'networks', '1.json')
    const object = [{ name: "Contract", address: "addy" }]
    await writeNetworkConfig(object, networkConfigPath)
    expect(JSON.parse(fs.readFileSync(networkConfigPath))).toEqual(object)
  })
})
