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

module.exports = async function (networksPath, outputPath) {
  const networkConfigs = await readAllNetworkConfigs(networksPath)

  if (!(await exists(path.join(process.cwd(), outputPath)))) {
    console.log(chalk.green('Output path: ' + outputPath + ' does not exist. Creating...'))
    mkdirp.sync(path.join(process.cwd(), outputPath))
  }

  const networkConfigsIsEmpty = (
    Object.keys(networkConfigs).length === 0
    && networkConfigs.constructor === Object
  )

  if (networkConfigsIsEmpty) {
    console.log(chalk.red('Network configs are empty, doing nothing ...'))
  } else {
    console.log(chalk.green('Processing artifacts ...'))

    await readdir(outputPath).then(async (filenames) => {
      await Promise.all(filenames.map((filename) => {
        var filepath = path.join(outputPath, filename)

        return readFile(filepath).then(json => {
          var artifact = JSON.parse(json)

          return updateArtifact(artifact, networkConfigs).then(updatedArtifact => {
            var artifactOutputPath = path.join(outputPath, filename)
            var outputJSON = JSON.stringify(updatedArtifact, null, 2)

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
