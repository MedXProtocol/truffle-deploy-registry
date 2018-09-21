var writeNetworkConfig = require('../writeNetworkConfig')
var path = require('path')
var fs = require('fs')
var mkdirTmp = require('./helpers/mkdirTmp')

describe('writeNetworkConfig()', () => {
  let tempDir

  beforeAll(() => {
    tempDir = mkdirTmp()
  })

  afterAll(() => {
    fs.rmdirSync(tempDir)
  })

  it('should do stuff', async () => {
    var networkConfigPath = path.join(tempDir, 'networks', '1.json')
    var object = [{ name: "Contract", address: "addy" }]
    await writeNetworkConfig(object, networkConfigPath)
    expect(JSON.parse(fs.readFileSync(networkConfigPath))).toEqual(object)
  })
})
