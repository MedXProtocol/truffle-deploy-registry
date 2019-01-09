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

const updateArtifactFiles = (inputArtifactsPath, outputArtifactsPath, networkConfigs) => {
  return new Promise(async (resolve, reject) => {
    await readdir(inputArtifactsPath).then(async (filenames) => {
      await Promise.all(filenames.map((filename) => {
        const filepath = path.join(inputArtifactsPath, filename)

        return readFile(filepath).then(json => {
          const artifact = JSON.parse(json)

          return updateArtifact(artifact, networkConfigs).then(updatedArtifact => {
            const artifactOutputPath = path.join(outputArtifactsPath, filename)
            const outputJSON = JSON.stringify(updatedArtifact, null, 2)

            return writeFile(artifactOutputPath, outputJSON).then(() => {
              console.log(chalk.cyan(`Updated existing artifact: ${filename}`))
            })
          })
        })
      }))

      console.log(chalk.grey('Updating complete!'))
      resolve()
    })
  })
}

const createMissingArtifactFiles = (outputArtifactsPath, networkConfigs) => {
  return new Promise(async (resolve, reject) => {
    const uniqContractNames = uniqueContractNames(networkConfigs)

    await uniqContractNames.forEach(async contractName => {
      const artifact = { contractName }
      const filename = `${contractName}.json`
      const filepath = path.join(outputArtifactsPath, filename)

      if (!fs.existsSync(filepath)) {
        const updatedArtifact = await updateArtifact(artifact, networkConfigs)

        const artifactOutputPath = path.join(outputArtifactsPath, filename)
        const outputJSON = JSON.stringify(updatedArtifact, null, 2)
        fs.writeFileSync(artifactOutputPath, outputJSON)

        console.log(chalk.cyan(`Created new artifact: ${filename}`))
      }
    })

    console.log(chalk.grey('Creation complete!'))
    resolve()
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
    if (fs.existsSync(inputArtifactsPath)) {
      console.log(chalk.green('Updating existing artifacts ...'))
      await updateArtifactFiles(inputArtifactsPath, outputArtifactsPath, networkConfigs)
    }

    console.log(chalk.green('Creating new artifacts (if necessary) ...'))
    await createMissingArtifactFiles(outputArtifactsPath, networkConfigs)
  }
}
