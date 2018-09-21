const path = require('path')
const processAllArtifacts = require('../processAllArtifacts')
const config = require('../config')
const debug = require('debug')
const util = require('util')
const mkdirTmp = require('./helpers/mkdirTmp')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)

describe('processAllArtifacts()', () => {
  let outputPath

  const networksPath = path.join(__dirname, '..', '__stubs__')
  const artifactsPath = path.join(__dirname, '..', '__stubs__', 'artifacts')

  beforeAll(() => {
    outputPath = mkdirTmp()
    config.overrideNetworksPath(networksPath)
  })

  afterAll(() => {
    fs.rmdirSync(outputPath)
  })

  it('should process the artifacts', async () => {
    await processAllArtifacts(artifactsPath, outputPath)

    const json = await readFile(path.join(outputPath, 'Contract2.json'))

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
