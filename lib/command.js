#!/usr/bin/env node

const program = require('commander')
  .version('0.5.0')
  .option('-n, --networks-path <n>', 'Networks path, use this if your truffle networks directory is not in the default location: "./networks"')
  .option('-o, --output-path <n>', 'Output (or artifacts) path, use this to override the default of "./build/contracts"')
  .parse(process.argv)

const path = require('path')
const chalk = require('chalk')
const processAllArtifacts = require('./processAllArtifacts')

let networksPath = program.networksPath
let outputPath = program.outputPath

if (!networksPath) {
  networksPath = path.join('networks')
  console.log(chalk.magenta('Using default networks path: "' + networksPath + '" ...'))
}

if (!outputPath) {
  outputPath = 'build/contracts'
  console.log(chalk.magenta('Using default output path: "' + outputPath + '" ...'))
}

processAllArtifacts(networksPath, outputPath)
  .then(() => {
    console.log(chalk.green('Complete!'))
  })
  .catch((error) => {
    console.log(chalk.red('Unable to process: ', error))
  })
