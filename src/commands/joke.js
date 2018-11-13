const {Command} = require('@oclif/command');
const {exec, echo} = require("shelljs");
const chalk = require("chalk");
const giveMeAJoke = require('give-me-a-joke');

const {text, clear, bigText, sleep} = require("../helpers");

class Joke extends Command {
	async run() {
		let param = process.argv.slice(3, 50).join(" ");

		bigText("hvn");
		await sleep(1520);
		console.log(`
		
		
		`);

// To get a random dad joke
// 		giveMeAJoke.getRandomDadJoke(function (joke) {
// 			//=> console.log(joke);
// 		});

// To get a random Chuck Norris joke
		giveMeAJoke.getRandomCNJoke(function (joke) {

			text(joke, false);

		});

// To get a customized joke
// 		var fn = "Jackie";
// 		var ln = "Chan";
// 		giveMeAJoke.getCustomJoke(fn, ln, function (joke) {
// 			//=> console.log(joke);
// 		});

	}
}

Joke.description = `hvn command // will run command promp
...
An easy way to run any of your npm scripts with yarn
`;

module.exports = Joke;

