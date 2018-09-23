#!/usr/bin/env node
const run = require('./app/plugins/projectRunner/index')
const packageJson = require(process.cwd() + '/package.json')
// const args = require('args')
const runner = new run()
const program = require('commander')
const simpleServer = require('./app/plugins/server/index')
const runServer = new simpleServer()
var path = require('path')
const rootDir = path.resolve(__dirname, './app/scripts/macInstallations.sh')

var exec = require('child_process').exec
const inquirer = require('inquirer')
const clear = require('clear')

const requireLetterAndNumber = value => {
  clear()
  if (/\w/.test(value) && /\d/.test(value)) {
    return true
  }
  return 'Password need to have at least a letter and a number'
}

// hvn run -s DEVELOPMENT
program
.command('run')
.description('run the app')
.option('-s, --setup_mode [mode]', 'Which setup mode to use')
.action(function (env, options) {
  runner.run()
  console.log('setup for %s env(s) with %s mode', options)
})

program
.command('server')
.alias('s')
.description('run simple python server')
.action(function (cmd, options) {
  runServer.runSimpleServer()
})

if (process.argv.length == 2) {

  inquirer.prompt([{
    type: 'confirm',
    name: 'install',
    message: 'Do you want to install needed dev dependencies?',
    default: false
  }]).then(answers => {
    if (answers.install) {
      const {exec} = require('child_process')
      console.warn('sh ' + rootDir)
      var child = exec('sh ' + rootDir, {async: true})
      child.stdout.on('data', function (data) {
        console.log(data)
      })

      exec('sh ' + rootDir, function (code, stdout, stderr) {
        console.log('Exit code:', code)
        console.log('Program output:', stdout)
        console.log('Program stderr:', stderr)
      })
    }
  })
}

program.parse(process.argv)

// const {addListener, mainStory} = require('storyboard')
// const browserExtListener = require('storyboard-listener-browser-extension').default

// require('storyboard-preset-console')
// const shell = require('shelljs')

// const execa = require('execa')
// const getStream = require('get-stream')
//
// if (!shell.which('gulp')) {
//   shell.echo('Sorry, this script requires git');
//   shell.exit(1);
// // }
// if (shell.exec('sh bashme.sh').code !== 0) {
//   shell.echo('Error: Git commit failed');
//   shell.exit(1);
// }
// const stream = execa('sh bashme.sh').stdout
//
//
//
// stream.pipe(process.stdout)
//
// getStream(stream).then(value => {
//   console.log('child output:', value)
// })
//
// args
// .option('port', 'The port on which the app will be running', 3000)
// .option('reload', 'Enable/disable livereloading')
// .command('serve', 'Serve your static site', ['s'])
// runner.run()
// const flags = args.parse(process.argv)
// console.log(JSON.stringify(flags), '------as--a')
// Pass in the descriptor, and it'll return an object
// console.warn("ASD");
// console.log("ASDSD");
// mainStory.trace('Teeny-weeny detail: x = 3, y = 4');
// mainStory.debug('Called login()');
// mainStory.info('User "admin" authenticated successfully');
// mainStory.warn('Sad we can\'t show colors in GFM');
// mainStory.error('User "admin" could not be authenticated', {attach: {}});
// mainStory.fatal('Ooops! Crashed! Mayday!', {attach: {}});
// const execa = require('execa');
// execa.shellSync('gulp').then((out) => console.log('s""', out))
