const {Command} = require('@oclif/command');
const {exec} = require("shelljs");
const chalk = require("chalk");

const {donkey, sleep} = require("../helpers");

class Commander extends Command {
	async run() {

		let param = process.argv.slice(3, 50).join(" ");

		donkey("Hope that answer works fo you!!");
		await sleep(1200);

		let child = exec("tldr " + param, {async: true, silent: true});

		child.stdout.on('data', function (data) {
			// console.log(chalk.yellow(data));
			console.log(chalk`{hex('#DBDEE1')${data.replace(/\n\n/g, "\n")}}`);
		});
	}
}

Commander.description = `Lets you get information about common commands you'd want to run like find/zip
...
It's amazing
`;

module.exports = Commander;

