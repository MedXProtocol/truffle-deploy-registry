#!/usr/bin/env node
const chalk = require('chalk')
const path = require('path')

const applyRegistryProgram = require('./applyRegistryProgram')
const processAllArtifacts = require('./processAllArtifacts')

const options = applyRegistryProgram(process.argv)

// Scope by current directory
const inputArtifactsPath  = path.join(process.cwd(), options.inputArtifactsPath)
const outputArtifactsPath = path.join(process.cwd(), options.outputArtifactsPath)
const networksPath        = path.join(process.cwd(), options.networksPath)

processAllArtifacts(inputArtifactsPath, outputArtifactsPath, networksPath)
  .then(() => {
  })
  .catch((error) => {
    console.log(chalk.red('Unable to process: ', error))
  })
