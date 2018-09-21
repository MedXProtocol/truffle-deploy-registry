const updateArtifact = require('./updateArtifact')

var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', function (chunk) {
  inputChunks.push(chunk)
});

stdin.on('end', function () {
  const inputJSON = inputChunks.join()
  const artifact = JSON.parse(inputJSON)
  const newArtifact = updateArtifact(artifact)

  const outputJSON = JSON.stringify(newArtifact, null, 2)
  stdout.write(outputJSON)
  stdout.write('\n')
})
