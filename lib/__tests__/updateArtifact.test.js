const updateArtifact = require('../updateArtifact')
const config = require('../config')
const path = require('path')
const debug = require('debug')

describe('updateArtifacts()', () => {

  beforeAll(() => {
    const tempDir = path.join(__dirname, '..', '__stubs__')
    config.overrideNetworksPath(tempDir)
  })

  const artifact = {
    "contractName": "Contract2",
    "abi": [],
    "networks": {
      "1": {
        "events": {},
        "links": {},
        "address": "0x3383c29542b8c96eafed98c4aafe789ddb256e19",
        "transactionHash": "0xbef1787981c4512c8bc8acf59e6cbe9c23c9c5ea269b193ec71aae9f9c57c997"
      }
    },
    "updatedAt": "2018-09-19T21:37:52.903Z"
  }

  it('should load the networks', async () => {
    expect(await updateArtifact(artifact)).toEqual({
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
    })
  })
})
