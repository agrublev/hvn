// TODO
// Check yarn or npm and ask user to choose
// check if nodes modules
// show list of possible runnable scripts
// on choice store in config file his default choice for this project
// update choice by running project run --rebuild

/**
 * Run any project by getting a list of the possible runnable systems
 * - npm
 * - yarn
 * - gulp
 * - etc
 * @type {module.run}
 */


module.exports = class run {
	async run() {
    const {exec} = require('child_process');

    var child = exec('gulp', {async: true})
    child.stdout.on('data', function (data) {
      console.log(data)
      /* ... do something with data ... */
    })



  }
}
