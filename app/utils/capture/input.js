/**
 * Input prompt example
 */

var capture = module.exports;

/**
 * Client interfaces
 */

var inquirer = require('inquirer');
var chalkPipe = require('chalk-pipe');


capture.prompt = function (questions) {
	return new Promise(function (resolve, reject) {
		inquirer.prompt(questions).then(answers => {
			resolve(answers);
		}).catch((e) => reject(e));
	});
}

