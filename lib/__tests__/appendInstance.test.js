jest.mock('../append')

var mockAppend = require('../append')
var appendInstance = require('../appendInstance')

describe('appendInstance()', () => {
  it('should append a new entry', async () => {

    await appendInstance({
      constructor: {
        _json: { contractName: 'Testme' },
        network_id: 1234
      },
      address: '0x5444',
      transactionHash: '0x142'
    })

    expect(mockAppend.mock.calls).toHaveLength(1)
    expect(mockAppend.mock.calls[0]).toEqual([
      1234, { contractName: 'Testme', address: '0x5444', transactionHash: '0x142' }
    ])
  })
})
