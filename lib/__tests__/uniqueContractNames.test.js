var uniqueContractNames = require('../uniqueContractNames')

describe('uniqueContractNames()', () => {
  it('should return a uniq array', async () => {

    const networkConfigs = {
      '2': [
        { contractName: 'Contract1', address: '0x1111' },
        { contractName: 'Contract2', address: '0x2222' },
        { contractName: 'Contract3', address: '0x3333' },
        { contractName: 'Contract2', address: '0x4444' },
        { contractName: 'Contract1', address: '0x5555' }
      ],
      '3': [
        { contractName: 'Contract2', address: 'addy' }
      ]
    }

    const uniqArray = await uniqueContractNames(networkConfigs)

    expect(uniqArray).toEqual([
      'Contract1', 'Contract2', 'Contract3'
    ])
  })
})
