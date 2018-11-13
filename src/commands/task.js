const {Command} = require('@oclif/command');
const {exec,echo} = require("shelljs");
const chalk = require("chalk");
const readJson = require('read-package-json');

const {text, clear, whichScript} = require("../helpers");

const evenOut = (items) => {
	let leftMax = items[0][0].length;
	items.forEach(it => {
		if (leftMax < it[0].length) {
			leftMax = it[0].length;
		}
	});
	leftMax += 10;
	let newArr = [];
	items.forEach(it => {
		let needed = leftMax - it[0].length;
		it[0] = "˻" + it[0] + "˼" + new Array(needed).join(' ');
		newArr.push(it[0] + "˧ " + it[1] + ' Ͱ');
	});
	return newArr;
};

class Task extends Command {
	async run() {
		readJson('./package.json', console.error, false, async function (er, data) {
			if (er) {
				console.error("There was an error reading the file");
				return;
			}
			clear();

			let scripts = Object.keys(data.scripts).map(sc => {
				return [sc, data.scripts[sc]];
			});
			scripts = evenOut(scripts); // console.log(scripts); // clear(); clear();
			let ans = await whichScript(scripts);
			let runme = ans.run.split("˼")[0];
			runme = runme.replace("˻", "");
			let child = exec("yarn " + runme, {async: true, silent: true});
			child.stdout.on('data', function (data) {
				// console.log(chalk.yellow(data));
				text(data);
			});
		});


	}
}

Task.description = `hvn command // will run command promp
...
An easy way to run any of your npm scripts with yarn
`;

module.exports = Task;

