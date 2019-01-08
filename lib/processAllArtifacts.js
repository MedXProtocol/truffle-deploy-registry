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
  console.log(chalk.blue(networkConfigs))

  if (!(await exists(path.join(process.cwd(), outputPath)))) {
    console.log(chalk.green('Output path: ' + outputPath + ' does not exist. Creating...'))
    mkdirp.sync(path.join(process.cwd(), outputPath))
  }

  console.log(chalk.green('Processing artifacts ...'))

  console.log(chalk.red(networksPath))
  console.log(chalk.yellow(outputPath))


  await readdir(outputPath).then(async (filenames) => {
    await Promise.all(filenames.map((filename) => {
      var filepath = path.join(outputPath, filename)

      return readFile(filepath).then(json => {
        var artifact = JSON.parse(json)

        return updateArtifact(artifact, networkConfigs).then(updatedArtifact => {
          // console.log('updatedArtifact', updatedArtifact)
          var artifactOutputPath = path.join(outputPath, filename)
          // console.log('artifactOutputPath', artifactOutputPath)
          var outputJSON = JSON.stringify(updatedArtifact, null, 2)

          // console.log(updatedArtifact)
          // console.log(outputJSON)

          return writeFile(artifactOutputPath, outputJSON).then(() => {
            console.log(chalk.cyan(`Updated artifact: ${filename} with data from network file: ${artifactOutputPath}`))
          })
        })
      })
    }))
  })
}
