
const path = require('path')
const chalk = require('chalk')

const DEFAULT_NETWORKS_PATH = path.join('networks')
const DEFAULT_OUTPUT_PATH   = path.join('build', 'contracts')

module.exports = function (argv) {
  console.log(argv)
  let networksPath,
    outputArtifactsPath,
    inputArtifactsPath

  const commander = require('commander')
    .version('0.5.0')
    .arguments('[input] [output]')
    .action(function (input, output) {
       inputArtifactsPath  = input
       outputArtifactsPath = output
    })
    .option('-n, --networks-path <n>', 'Networks path. Use this if your truffle networks directory is not in the default location: "./networks"')
    .option('-o, --output-artifacts-path <n>', 'Output artifacts path. This is where the modified artifact files will end up. Use this option to override the default of "./build/contracts"')
    .option('-i, --input-artifacts-path <n>', 'Input artifacts path. If you need to specify the directory where your existing contract artifacts live. Default is "./build/contracts"')
    .parse(argv)

  // For backwards compatibility, prioritize the 1st and 2nd arguments passed in
  // (if there are any) first
  if (typeof inputArtifactsPath !== 'undefined') {
    console.log(chalk.magenta(`Using 1st argument input path:  "${inputArtifactsPath}"`))
  } else if (typeof commander.inputArtifactsPath !== 'undefined') {
    inputArtifactsPath = commander.inputArtifactsPath
    console.log(chalk.magenta(`Using input path option:        "${inputArtifactsPath}"`))
  }
  if (typeof outputArtifactsPath !== 'undefined') {
    console.log(chalk.magenta(`Using 2nd argument output path: "${outputArtifactsPath}"`))
  } else if (typeof commander.outputArtifactsPath !== 'undefined') {
    outputArtifactsPath = commander.outputArtifactsPath
    console.log(chalk.magenta(`Using output path option:       "${outputArtifactsPath}"`))
  }


  if (typeof commander.networksPath !== 'undefined') {
    networksPath = commander.networksPath
    console.log(chalk.magenta(`Using networks path option:     "${networksPath}"`))
  } else {
    networksPath = DEFAULT_NETWORKS_PATH
    console.log(chalk.magenta(`Using default networks path:    "${networksPath}"`))
  }

  if (!outputArtifactsPath) {
    outputArtifactsPath = DEFAULT_OUTPUT_PATH
    console.log(chalk.magenta(`Using default output path:      "${outputArtifactsPath}"`))
  }

  // When no input path is specified use the same path as the output
  if (!inputArtifactsPath) {
    inputArtifactsPath = DEFAULT_OUTPUT_PATH
    console.log(chalk.magenta(`Using default input path:       "${inputArtifactsPath}"`))
  }

  return {
    inputArtifactsPath,
    outputArtifactsPath,
    networksPath
  }
}