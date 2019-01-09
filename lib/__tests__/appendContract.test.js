jest.mock('../append')

var mockAppend = require('../append')
var appendContract = require('../appendContract')

describe('appendContract()', () => {
  it('should append a new entry', async () => {

    await appendContract(1234, {
      contractName: 'Testme',
      address: '0x5444'
    })

    expect(mockAppend.mock.calls).toHaveLength(1)
    expect(mockAppend.mock.calls[0]).toEqual([
      1234, { contractName: 'Testme', address: '0x5444' }
    ])
  })
})
