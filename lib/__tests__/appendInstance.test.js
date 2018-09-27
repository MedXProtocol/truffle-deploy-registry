jest.mock('../append')

var mockAppend = require('../append')
var appendInstance = require('../appendInstance')

describe('appendInstance()', () => {
  it('should append a new entry', async () => {

    await appendInstance(1234, {
      _json: { contractName: 'Testme' },
      address: '0x5444',
      transactionHash: '0x142'
    })

    expect(mockAppend.mock.calls.length).toEqual(1)
    expect(mockAppend.mock.calls[0]).toEqual([
      1234, { contractName: 'Testme', address: '0x5444', transactionHash: '0x142' }
    ])
  })
})
