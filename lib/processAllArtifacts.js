var chalk = require('chalk')
var util = require('util')
var fs = require('fs')
var path = require('path')

var readAllNetworkConfigs = require('./readAllNetworkConfigs')
var updateArtifact = require('./updateArtifact')

var mkdirp = require('mkdirp')
var exists = util.promisify(fs.exists)
var readFile = util.promisify(fs.readFile)
var writeFile = util.promisify(fs.writeFile)
var readdir = util.promisify(fs.readdir)

module.exports = async function (inputArtifactsPath, outputArtifactsPath, networksPath) {
  const networkConfigs = await readAllNetworkConfigs(networksPath)

  if (!(await exists(inputArtifactsPath))) {
    console.log(chalk.red('Input path: ' + inputArtifactsPath + ' does not exist!'))
    // process.exit(0)
  }

  if (!(await exists(outputArtifactsPath))) {
    console.log(chalk.green('Output path: ' + outputArtifactsPath + ' does not exist. Creating...'))
    mkdirp.sync(outputArtifactsPath)
  }

  const networkConfigsIsEmpty = (
    Object.keys(networkConfigs).length === 0
    && networkConfigs.constructor === Object
  )

  if (networkConfigsIsEmpty) {
    console.log(chalk.red('Network configs are empty, doing nothing ...'))
  } else {
    console.log(chalk.green('Processing artifacts ...'))

    await readdir(inputArtifactsPath).then(async (filenames) => {
      await Promise.all(filenames.map((filename) => {
        const filepath = path.join(inputArtifactsPath, filename)

        return readFile(filepath).then(json => {
          const artifact = JSON.parse(json)

          return updateArtifact(artifact, networkConfigs).then(updatedArtifact => {
            const artifactOutputPath = path.join(outputArtifactsPath, filename)
            const outputJSON = JSON.stringify(updatedArtifact, null, 2)

            return writeFile(artifactOutputPath, outputJSON).then(() => {
              console.log(chalk.cyan(`Updated 'networks' in artifact: ${filename}`))
            })
          })
        })
      }))

      console.log(chalk.grey('Complete!'))
    })
  }
}
