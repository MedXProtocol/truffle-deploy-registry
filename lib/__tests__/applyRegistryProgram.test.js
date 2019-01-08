const applyRegistryProgram = require('../applyRegistryProgram')
const config = require('../config')

describe('applyRegistryProgram', () => {
  it('works with cmd line args', () => {
    config.resetConfig()

    expect(
      applyRegistryProgram(['node', 'apply-registry', 'build/asdf', 'build/output'])
    ).toEqual({
      inputArtifactsPath: 'build/asdf',
      outputArtifactsPath: 'build/output',
      networksPath: 'networks'
    })
  })

  it('works with options', () => {
    config.resetConfig()

    expect(
      applyRegistryProgram(['node', 'apply-registry', '-n', 'second/networks', '-o', 'output/dir', '-i', 'artifacts/dir'])
    ).toEqual({
      inputArtifactsPath: 'artifacts/dir',
      outputArtifactsPath: 'output/dir',
      networksPath: 'second/networks'
    })
  })

  it('uses defaults', () => {
    config.resetConfig()

    expect(
      applyRegistryProgram(['node', 'apply-registry'])
    ).toEqual({
      inputArtifactsPath: 'build/contracts',
      outputArtifactsPath: 'build/contracts',
      networksPath: 'networks'
    })
  })
})
