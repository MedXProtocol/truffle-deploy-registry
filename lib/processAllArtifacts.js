var chalk = require('chalk')
var util = require('util')
var fs = require('fs')
var path = require('path')

var uniqueContractNames = require('./uniqueContractNames')
var readAllNetworkConfigs = require('./readAllNetworkConfigs')
var updateArtifact = require('./updateArtifact')

var mkdirp = require('mkdirp')
var exists = util.promisify(fs.exists)
var readFile = util.promisify(fs.readFile)
var writeFile = util.promisify(fs.writeFile)
var readdir = util.promisify(fs.readdir)

const updateArtifacts = async (artifacts, outputArtifactsPath, networkConfigs) => {
  await Promise.all(artifacts.map(async artifact => {
    const filename = `${artifact.contractName}.json`
    const updatedArtifact = await updateArtifact(artifact, networkConfigs)

    const artifactOutputPath = path.join(outputArtifactsPath, filename)
    const outputJSON = JSON.stringify(updatedArtifact, null, 2)
    fs.writeFileSync(artifactOutputPath, outputJSON)

    console.log(chalk.cyan(`Updated artifact: ${filename}`))
  }))

  console.log(chalk.grey('Updating complete!'))
}

const collectArtifacts = (inputArtifactsPath, networkConfigs) => {
  const uniqContractNames = uniqueContractNames(networkConfigs)
  return uniqContractNames.map(contractName => {
    const filename = `${contractName}.json`
    const filepath = path.join(inputArtifactsPath, filename)

    if (!fs.existsSync(filepath)) {
      console.log(chalk.cyan(`Creating new artifact: ${filepath}...`))
      return {
        contractName
      }
    } else {
      const json = fs.readFileSync(filepath)
      return JSON.parse(json)
    }
  })
}

module.exports = async function (inputArtifactsPath, outputArtifactsPath, networksPath) {
  const networkConfigs = await readAllNetworkConfigs(networksPath)

  if (!(await exists(inputArtifactsPath))) {
    console.log(chalk.yellow(`Input path: ${inputArtifactsPath} does not exist!`))
  }

  if (!(await exists(outputArtifactsPath))) {
    console.log(chalk.green(`Output path: ${outputArtifactsPath} does not exist. Creating...`))
    mkdirp.sync(outputArtifactsPath)
  }

  const networkConfigsIsEmpty = (
    Object.keys(networkConfigs).length === 0
      && networkConfigs.constructor === Object
  )

  if (networkConfigsIsEmpty) {
    console.log(chalk.red('Network configs are empty, doing nothing ...'))
  } else {
    const artifacts = collectArtifacts(inputArtifactsPath, networkConfigs)
    await updateArtifacts(artifacts, outputArtifactsPath, networkConfigs)
  }
}
