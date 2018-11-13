const {Command} = require('@oclif/command');
const {exec, echo} = require("shelljs");
const chalk = require("chalk");
const spawn = require("child_process").spawn;


const {text, clear, bigText, sleep} = require("../helpers");

class Editor extends Command {
	async run() {
		let param = process.argv.slice(3, 50).join(" ");
		console.log(param);
		const child = spawn("slap", [param], {shell: true, stdio: 'inherit'});
	}
}

Editor.description = `Edit any file just like in a real ide!
...
Just type hvn editor FILE
`;

module.exports = Editor;

