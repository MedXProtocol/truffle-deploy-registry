var path = require('path')
var config = require('../config')
var util = require('util')
var mkdirTmp = require('./helpers/mkdirTmp')
var fs = require('fs')

var processAllArtifacts = require('../processAllArtifacts')

var readFile = util.promisify(fs.readFile)

describe('processAllArtifacts()', () => {
  let outputArtifactsPath
  let destinationFilePath

  const networksPath = path.join(__dirname, '..', '__stubs__', 'networks')
  const inputArtifactsPath = path.join(__dirname, '..', '__stubs__', 'artifacts')

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

  it('should process the artifacts', async () => {
    await processAllArtifacts(inputArtifactsPath, outputArtifactsPath, networksPath)

    const json = await readFile(destinationFilePath)

    expect(JSON.parse(json)).toEqual(
      {
        "contractName": "Contract2",
        "abi": [],
        "networks": {
          "1": {
            "events": {},
            "links": {},
            "address": "0x3383c29542b8c96eafed98c4aafe789ddb256e19",
            "transactionHash": "0xbef1787981c4512c8bc8acf59e6cbe9c23c9c5ea269b193ec71aae9f9c57c997"
          },
          "2": {
            "events": {},
            "links": {},
            "address": "0x4444",
            "transactionHash": ""
          },
          "3": {
            "events": {},
            "links": {},
            "address": "addy",
            "transactionHash": ""
          }
        },
        "updatedAt": "2018-09-19T21:37:52.903Z"
      }
    )
  })
})
