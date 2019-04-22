#!/usr/bin/env node
'use strict'
const ghdownload = require('github-download')
const chalk = require('chalk')
const shelljs = require('shelljs')
let app = process.argv.slice(2)[0]
if (!app) {
  console.log(chalk.red('Need an app name: $ npx create-webpack-vue-multi-page-app appName'))
  process.exit(1)
}
console.log(chalk.green(`Creating a new app '${app}'...`))
ghdownload('git@github.com:fancyboynet/webpack-vue-multi-page-scaffold.git', app)
  .on('error', function(err) {
    console.log(chalk.red(err.message))
    process.exit(1)
  })
  .on('end', function() {
    console.log(chalk.green('Installing packages...'))
    const inStallCommand = shelljs.which('yarn') ? 'yarn' : 'npm i'
    shelljs.exec(`cd ${app} && ${inStallCommand}`, function (code, stdout, stderr) {
      console.log(chalk.green('Install complete.'))
    })
  })
