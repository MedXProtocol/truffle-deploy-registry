var path = require('path')
var util = require('util')
var fs = require('fs')
var rimraf = require('rimraf')

var mkdirTmp = require('./helpers/mkdirTmp')

var processAllArtifacts = require('../processAllArtifacts')

var readFile = util.promisify(fs.readFile)
var rimrafPromisified = util.promisify(rimraf)

describe('processAllArtifacts()', () => {
  let outputArtifactsPath,
    destinationFile1Path,
    destinationFile2Path,
    destinationFile3Path

  const networksPath = path.join(process.cwd(), 'lib', '__stubs__', 'networks')
  const inputArtifactsPath = path.join(process.cwd(), 'lib', '__stubs__', 'artifacts')

  const sourceFilePath = path.join(inputArtifactsPath, 'Contract2.json')

  beforeAll(async () => {
    outputArtifactsPath = mkdirTmp()
    destinationFile1Path = path.join(outputArtifactsPath, 'Contract1.json')
    destinationFile2Path = path.join(outputArtifactsPath, 'Contract2.json')
    destinationFile3Path = path.join(outputArtifactsPath, 'Contract3.json')

    fs.copyFileSync(sourceFilePath, destinationFile2Path, (error) => {
      console.log('Copying "' + sourceFilePath + '" to: "' + destinationFile2Path + '"' )

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

    await expectFile2ToBeUpdated()

    await expectFile1ToBeCreated()
    await expectFile3ToBeCreated()
  })

  async function expectFile1ToBeCreated() {
    const json = await readFile(destinationFile1Path)

    expect(JSON.parse(json)).toEqual(
      {
        'contractName': 'Contract1',
        'networks': {
          '2': {
            'address': '0x5555',
            'events': {},
            'links': {},
            'transactionHash': ''
          }
        }
      }
    )
  }

  async function expectFile2ToBeUpdated() {
    const json = await readFile(destinationFile2Path)

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
  }

  async function expectFile3ToBeCreated() {
    const json = await readFile(destinationFile3Path)

    expect(JSON.parse(json)).toEqual(
      {
        'contractName': 'Contract3',
        'networks': {
          '2': {
            'address': '0x3333',
            'events': {},
            'links': {},
            'transactionHash': ''
          }
        }
      }
    )
  }
})
