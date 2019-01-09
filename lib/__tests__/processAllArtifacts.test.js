var path = require('path')
var util = require('util')
var fs = require('fs')
var rimraf = require('rimraf')

var mkdirTmp = require('./helpers/mkdirTmp')

var processAllArtifacts = require('../processAllArtifacts')

var readFile = util.promisify(fs.readFile)
var rimrafPromisified = util.promisify(rimraf)

describe('processAllArtifacts()', () => {
  let outputArtifactsPath
  let destinationFilePath

  const networksPath = path.join(process.cwd(), 'lib', '__stubs__', 'networks')
  const inputArtifactsPath = path.join(process.cwd(), 'lib', '__stubs__', 'artifacts')

  const sourceFilePath = path.join(inputArtifactsPath, 'Contract2.json')

  beforeAll(async () => {
    outputArtifactsPath = mkdirTmp()
    destinationFilePath = path.join(outputArtifactsPath, 'Contract2.json')

    await fs.copyFile(sourceFilePath, destinationFilePath, (error) => {
      console.log('Copying "' + sourceFilePath + '" to: "' + destinationFilePath + '"' )

      if (error) {
        console.error(error)
      }
    })
  })

  afterAll(() => {
    fs.rmdirSync(outputArtifactsPath)
  })

  it('should ignore the input directory if it does not exist', async () => {
    await processAllArtifacts('asdf', outputArtifactsPath, networksPath)
  })

  it('should create the output directory when it does not exist', async () => {
    const tmpDir = path.join(process.cwd(), 'tmp')

    // delete directory and it's files
    await rimrafPromisified(tmpDir)

    await processAllArtifacts(inputArtifactsPath, tmpDir, networksPath)
  })

  it('should do nothing if the networks directory is empty', async () => {
    // Using scripts here as it doesn't have 1.json or 3.json in it, etc
    await processAllArtifacts(inputArtifactsPath, outputArtifactsPath, 'scripts')
  })

  it('should process the artifacts', async () => {
    await processAllArtifacts(inputArtifactsPath, outputArtifactsPath, networksPath)

    const json = await readFile(destinationFilePath)

    expect(JSON.parse(json)).toEqual(
      {
        'contractName': 'Contract2',
        'abi': [],
        'networks': {
          '1': {
            'events': {},
            'links': {},
            'address': '0x3383c29542b8c96eafed98c4aafe789ddb256e19',
            'transactionHash': '0xbef1787981c4512c8bc8acf59e6cbe9c23c9c5ea269b193ec71aae9f9c57c997'
          },
          '2': {
            'events': {},
            'links': {},
            'address': '0x4444',
            'transactionHash': ''
          },
          '3': {
            'events': {},
            'links': {},
            'address': 'addy',
            'transactionHash': ''
          }
        },
        'updatedAt': '2018-09-19T21:37:52.903Z'
      }
    )
  })
})
