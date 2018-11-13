const {Command} = require('@oclif/command');
const {exec, echo} = require("shelljs");
const chalk = require("chalk");

const {text, clear, bigText, sleep} = require("../helpers");

class Deploy extends Command {
	async run() {

		clear();
		bigText("hvn");
		await sleep(520);

		let child = exec("surge", {async: true, silent: true});
		child.stdout.on('data', function (data) {
			console.log(chalk.yellow(data));
		});

	}
}

Deploy.description = `hvn command // will run command promp
...
An easy way to run any of your npm scripts with yarn
`;

module.exports = Deploy;

