const {Command} = require('@oclif/command');
const {exec, echo} = require("shelljs");
const chalk = require("chalk");

const {text, clear, bigText, sleep} = require("../helpers");

class HowDoI extends Command {
	async run() {
		let param = process.argv.slice(3, 50).join(" ");

		clear();
		bigText("hvn");
		await sleep(520);

		let child = exec("howdoi " + param, {async: true, silent: true});
		child.stdout.on('data', function (data) {
			console.log(`
				`);
			// console.log(chalk.yellow(data));
			text(data);
		});

	}
}

HowDoI.description = `hvn command // will run command promp
...
An easy way to run any of your npm scripts with yarn
`;

module.exports = HowDoI;

