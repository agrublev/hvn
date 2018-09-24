#!/usr/bin/env node
const packageJson = require(process.cwd() + '/package.json')
const args = require('args')
var fs = require('fs')
// const runner = new run()
const program = require('commander')
// const simpleServer = require('./app/plugins/server/index')
// const runServer = new simpleServer()
var path = require('path')
const rootDir = path.resolve(__dirname, './app/scripts/macInstallations.sh')

// var exec = require('child_process').exec
const inquirer = require('inquirer')
const clear = require('clear')
let moveFrom = path.resolve(__dirname, './app/plugins')
fs.readdir(moveFrom, function (err, files) {
  if (err) {
    console.error('Could not list the directory.', err)
    process.exit(1)
  }

  files.forEach(function (file, index) {
    // Make one pass and make the file complete
    var fromPath = path.join(moveFrom, file)

    fs.stat(fromPath, function (error, stat) {
      if (error) {
        console.error('Error stating file.', error)
        return
      }

      if (stat.isFile())
        console.log('\'%s\' is a file.', fromPath)
      else if (stat.isDirectory()) {
        console.log('\'%s\' is a directory.', fromPath)
        let newPlugin = require(fromPath + '/index')
        let initPlugin = new newPlugin(program);
      }
    })
  })
  program
  .version('0.1.0')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz')

// must be before .parse() since
// node's emit() is immediate

  program.on('--help', function () {
    console.log('')
    console.log('Examples:')
    console.log('')
    console.log('  $ custom-help --help')
    console.log('  $ custom-help -h')
  })

  program.parse(process.argv)
})
// App.start(program)
//
// if (process.argv.length == 2) {
//
//   inquirer.prompt([{
//     type: 'confirm',
//     name: 'install',
//     message: 'Do you want to install needed dev dependencies?',
//     default: false
//   }]).then(answers => {
//     if (answers.install) {
//       const {exec} = require('child_process')
//       console.warn('sh ' + rootDir)
//       var child = exec('sh ' + rootDir, {async: true})
//       child.stdout.on('data', function (data) {
//         console.log(data)
//       })
//
//       exec('sh ' + rootDir, function (code, stdout, stderr) {
//         console.log('Exit code:', code)
//         console.log('Program output:', stdout)
//         console.log('Program stderr:', stderr)
//       })
//     }
//   })
// }
//
//

// const requireLetterAndNumber = value => {
//   clear()
//   if (/\w/.test(value) && /\d/.test(value)) {
//     return true
//   }
//   return 'Password need to have at least a letter and a number'
// }
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
