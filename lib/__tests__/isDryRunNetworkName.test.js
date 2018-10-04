const isDryRunNetworkId = require('../isDryRunNetworkId')

describe('isDryRunNetworkId', () => {
  it('should be true when the id ends with -fork', () => expect(isDryRunNetworkId('test-fork')).toBeTruthy())
  it('should not be true when the id does not end with -fork', () => expect(isDryRunNetworkId('-fork-balkd')).toBeFalsy())
})
