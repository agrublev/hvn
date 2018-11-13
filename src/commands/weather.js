const {Command} = require('@oclif/command');
const {exec, echo} = require("shelljs");
const chalk = require("chalk");

const {text, clear, bigText, sleep} = require("../helpers");

class Joke extends Command {
	async run() {
		let param = process.argv.slice(3, 50).join(" ");

		bigText("hvn");
		await sleep(1520);
		console.log(`
		`);

		let child = exec("curl wttr.in", {async: true, silent: true});
		child.stdout.on('data', function (data) {
			console.log(chalk.yellow(data));
		});

	}
}

Joke.description = `hvn command // will run command promp
...
An easy way to run any of your npm scripts with yarn
`;

module.exports = Joke;

