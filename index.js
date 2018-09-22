#!/usr/bin/env node
const {addListener, mainStory} = require('storyboard')
require('storyboard-preset-console')
const browserExtListener = require('storyboard-listener-browser-extension').default

var npa = require('npm-package-arg')
var result = npa()
mainStory.log(result)

// Pass in the descriptor, and it'll return an object
try {
  // noinspection JSUnusedLocalSymbols
  let parsed = npa('@bar/foo@1.2')
} catch (ex) {
  console.error(ex)
}
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
const execa = require('execa')
const getStream = require('get-stream')
const stream = execa('gulp').stdout

stream.pipe(process.stdout)

getStream(stream).then(value => {
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  mainStory.info('Hellsso world!')
  console.log('child output:', value)
})
