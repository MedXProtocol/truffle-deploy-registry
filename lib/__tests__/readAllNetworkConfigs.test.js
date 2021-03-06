var path = require('path')
var readAllNetworkConfigs = require('../readAllNetworkConfigs')

describe('readAllNetworkConfigs()', () => {
  it('should load the networks', async () => {
    var networksPath = path.join(__dirname, '..', '__stubs__', 'networks')

    expect(await readAllNetworkConfigs(networksPath)).toEqual({
      2: [
        { 'contractName': 'Contract1', 'address': '0x1111' },
        { 'contractName': 'Contract2', 'address': '0x2222' },
        { 'contractName': 'Contract3', 'address': '0x3333' },
        { 'contractName': 'Contract2', 'address': '0x4444' },
        { 'contractName': 'Contract1', 'address': '0x5555' },
        { 'contractName': 'Contract4', 'address': '0x9999' }
      ],
      3: [
        { 'contractName': 'Contract2', 'address': 'addy' }
      ]
    })
  })

  it('should handle missing directories', async () => {
    var networksPath = path.join(__dirname, '..', 'some', 'other', 'test')
    expect(await readAllNetworkConfigs(networksPath)).toEqual({})
  })
})
