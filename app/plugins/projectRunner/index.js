// TODO
// Check yarn or npm and ask user to choose
// check if nodes modules
// show list of possible runnable scripts
// on choice store in config file his default choice for this project
// update choice by running project run --rebuild
const editJsonFile = require('edit-json-file')
const clear = require('clear')

/**
 * Run any project by getting a list of the possible runnable systems
 * - npm
 * - yarn
 * - gulp
 * - etc
 * @type {module.run}
 */
const writeJsonFile = require('write-json-file')
const selectItem = require('../../utils/selectItem')

class App {
  constructor (hvn) {
    let self = this
    self.hvn = hvn
    self.hvn.file = editJsonFile(hvn.packageFile, {autosave: true})

    if (self.hvn.package === false) {
      // TODO HANDLE NO PACKAGE
    }
    if (self.hvn.package.hvn === undefined) {
      self.hvn.file.set('hvn', {})
    }

    self.hvn.program
    .command('run')
    .description('run the app')
    .option('-u, --update', 'Which setup mode to use')
    .option('-c, --custom', 'Which setup asduse')
    .action(function (env, options) {
      self.run(self.hvn.program)
    })
  }

  run (program) {
    let {hvn} = this
    let self = this
    if (program.args[0].update && !program.args[0].custom) {
      selectItem(hvn.taskList, function (ez) {
        hvn.file.set('hvn.run', ez.value)
      })
    } else if (program.args[0].custom) {
      self.setRun()
      // const customInput = require('../../utils/customInput')
      // customInput([{
      //   type: 'input',
      //   name: 'defaultRun',
      //   message: 'Enter a default run command:'
      // }], function (item) {
      //   console.log('----', item)
      //   hvn.file.set('hvn.run', item.defaultRun)
      // })
    } else {
      if (hvn.package.hvn.run === undefined && hvn.taskList.length) {
        self.setRun()
      }
      if (hvn.package.hvn.run !== undefined) {
        const {exec, spawn} = require('child_process')

        spawn(hvn.package.hvn.run, {stdio: 'inherit', shell: true})
        .on('exit', function (error) {
          if (!error) {
            // console.log('Success!')
          } else {
            // console.log('ERRIR!')
            process.exit(0)
          }
        })
      }
    }

    // var child = exec(hvn.package.hvn.run, {async: true})
    // child.stdout.on('data', function (data) {
    //   console.log(data)
    //   /* ... do something with data ... */
    // })
    // child.stdout.on('close', function (data) {
    //   console.log(data)
    //   process.exit(0)
    // })
  }

  setRun () {
    let {hvn} = this
    let self = this
    const customInput = require('../../utils/customInput')

    // selectItem(hvn.taskList, function (ez) {
    //   if (ez.value === 'customScript') {
        customInput([{
          type: 'input',
          name: 'defaultRun',
          message: 'Enter a default run command:'
        }], function (item) {
          // console.log('----', item)
          hvn.file.set('hvn.run', item.defaultRun)
        })
    //   } else {
    //     hvn.file.set('hvn.run', ez.value)
    //   }
    // })
  }
}

// let app = new App()
module.exports = App
