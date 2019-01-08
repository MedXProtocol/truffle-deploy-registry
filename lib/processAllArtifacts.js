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

module.exports = async function (artifactsPath, outputPath) {
  var networkConfigs = await readAllNetworkConfigs()

  if (!(await exists(path.join(process.cwd(), outputPath)))) {
    console.log(chalk.green('Output path: ' + outputPath + ' does not exist. Creating...'))
    mkdirp.sync(path.join(process.cwd(), outputPath))
  }

  await readdir(artifactsPath).then(async (filenames) => {
    await Promise.all(filenames.map((filename) => {
      var filepath = path.join(artifactsPath, filename)

      return readFile(filepath).then(json => {
        var artifact = JSON.parse(json)

        return updateArtifact(artifact, networkConfigs).then(newArtifact => {
          var artifactOutputPath = path.join(outputPath, filename)

          var outputJSON = JSON.stringify(newArtifact, null, 2)

          return writeFile(artifactOutputPath, outputJSON).then(() => {
            console.log(`Updated artifact ${filename} to ${artifactOutputPath}`)
          })
        })
      })
    }))
  })
}
