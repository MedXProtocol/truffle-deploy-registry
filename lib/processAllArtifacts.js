const util = require('util')
const fs = require('fs')
const path = require('path')
const readAllNetworkConfigs = require('./readAllNetworkConfigs')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const updateArtifact = require('./updateArtifact')
const readdir = util.promisify(fs.readdir)

module.exports = async function (artifactsPath, outputPath) {
  const networkConfigs = await readAllNetworkConfigs()
  await readdir(artifactsPath).then(async (filenames) => {
    await Promise.all(filenames.map((filename) => {
      const filepath = path.join(artifactsPath, filename)
      return readFile(filepath).then(json => {
        const artifact = JSON.parse(json)
        return updateArtifact(artifact, networkConfigs).then(newArtifact => {
          const artifactOutputPath = path.join(outputPath, filename)
          const outputJSON = JSON.stringify(newArtifact, null, 2)
          return writeFile(artifactOutputPath, outputJSON).then(() => {
            console.log(`Updated artifact ${filename} to ${artifactOutputPath}`)
          })
        })
      })
    }))
  })
}
