#!/usr/bin/env node
const program = require('./program')
const chalk = require('chalk')
const processAllArtifacts = require('./processAllArtifacts')

console.log(process.argv)

const options = program(process.argv)

// Scope by current directory
const inputArtifactsPath  = path.join(process.cwd(), options.inputArtifactsPath)
const outputArtifactsPath = path.join(process.cwd(), options.outputArtifactsPath)
const networksPath        = path.join(process.cwd(), options.networksPath)

processAllArtifacts(inputArtifactsPath, outputArtifactsPath, networksPath)
  .then(() => {
    // console.log(chalk.grey('Complete!'))
  })
  .catch((error) => {
    console.log(chalk.red('Unable to process: ', error))
  })
