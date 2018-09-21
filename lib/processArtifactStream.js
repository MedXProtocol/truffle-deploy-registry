var updateArtifact = require('./updateArtifact')

var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', function (chunk) {
  inputChunks.push(chunk)
});

stdin.on('end', function () {
  var inputJSON = inputChunks.join()
  var artifact = JSON.parse(inputJSON)
  var newArtifact = updateArtifact(artifact)

  var outputJSON = JSON.stringify(newArtifact, null, 2)
  stdout.write(outputJSON)
  stdout.write('\n')
})
