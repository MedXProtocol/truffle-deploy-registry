const isDryRunNetworkName = require('../isDryRunNetworkName')

describe('isDryRunNetworkName', () => {
  it('should be true when the id ends with -fork', () => expect(isDryRunNetworkName('test-fork')).toBeTruthy())
  it('should not be true when the id does not end with -fork', () => expect(isDryRunNetworkName('-fork-balkd')).toBeFalsy())
})
