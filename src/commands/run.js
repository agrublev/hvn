const {Command} = require('@oclif/command');
const {exec, echo} = require("shelljs");
const chalk = require("chalk");

const {text, clear, bigText, sleep} = require("../helpers");

class Run extends Command {
	async run() {
		await sleep(520);
		let param = process.argv.slice(3, 50).join(" ");

		let child = exec("yarn " + param, {async: true, silent: true});
		child.stdout.on('data', function (data) {
			echo("-n", data);
		});

	}
}

Run.description = `hvn command // will run command promp
...
An easy way to run any of your npm scripts with yarn
`;

module.exports = Run;
