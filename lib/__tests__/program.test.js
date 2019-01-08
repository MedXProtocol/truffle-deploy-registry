const program = require('../program')

describe('program', () => {
  it('should work', () => {
    expect(
      program(['node', 'apply-registry', 'build/asdf', 'build/output'])
    ).toEqual({
      inputArtifactsPath: 'build/asdf',
      outputArtifactsPath: 'build/output',
      networksPath: 'networks'
    })
  })

  it('should work again', () => {
    expect(
      program(['node', 'apply-registry', '-n', 'networksTwo'])
    ).toEqual({
      inputArtifactsPath: 'build/contracts',
      outputArtifactsPath: 'build/contracts',
      networksPath: 'networksTwo'
    })
  })
})
