var mostRecentEntryByContractName = require('../mostRecentEntryByContractName')

describe('mostRecentEntryByContractName()', () => {

  var entries = [
    { contractName: 'Contract2', address: '0x111' },
    { contractName: 'Contract1', address: '0x222' },
    { contractName: 'Contract2', address: '0x333' },
    { contractName: 'Contract1', address: '0x444' },
  ]

  it('should return the most recent', () => {
    expect(mostRecentEntryByContractName('Contract2', entries)).toEqual({ contractName: 'Contract2', address: '0x333' })
  })
})
