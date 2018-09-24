#!/usr/bin/env node
const App = require('./app/plugins/projectRunner/index')
const fs = require('fs')
const program = require('commander')
const path = require('path')

let hvn = {}
hvn.packageFile = process.cwd() + '/package.json'
hvn.packageJson = false
if (fs.existsSync(hvn.packageFile)) {
  hvn.packageJson = require(hvn.packageFile)
}

hvn.program = program
hvn.package = hvn.packageJson
hvn.taskList = []

/**
 * Initialize all data and only then start script
 * @returns {Promise<any>}
 */
async function main () {
  return await new Promise(async (resolve, reject) => {
    const {exec, spawn} = require('child_process')

    // NPM tasks
    if (hvn.packageJson.scripts !== undefined) {
      Object.keys(hvn.packageJson.scripts).forEach((script) => {
        hvn.taskList.push({text: script + ' - ' + hvn.packageJson.scripts[script], value: 'npm run ' + script})
      })
    }

    // GET GULP TASKS
    var child = await exec('gulp --tasks-simple', {async: true})
    child.stdout.on('data', function (data) {
      let gulpList = data.split('\n')
      gulpList.forEach((script) => {
        hvn.taskList.push({text: 'Gulp - ' + script, value: 'gulp ' + script})
      })
    })
    child.stdout.on('close', function () {
      resolve()
    })
  })
}

main().then(() => {
  let Run = new App(hvn)
  if (process.argv.length == 2) {
    if (hvn.packageJson === false) {

    }
    // else {
    //   Object.keys(hvn.packageJson.scripts).forEach((script) => {
    //     console.log(script)
    //   })
    // }
  }

  hvn.program
  .version('0.1.0')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz')

  hvn.program.on('--help', function () {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ custom-help --help')
    console.log('  $ custom-help -h')
  })
  hvn.program.parse(process.argv)
})


