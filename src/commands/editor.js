const {Command} = require('@oclif/command');
const {exec, echo} = require("shelljs");
const chalk = require("chalk");
const spawn = require("child_process").spawn;
const fs = require("fs");

const {text, clear, bigText, sleep} = require("../helpers");

class Editor extends Command {
	async run() {
		if (!fs.existsSync("/usr/local/bin/slap")) {
			let child = exec("curl -sL https://raw.githubusercontent.com/slap-editor/slap/master/install.sh | sh", {
				async: true,
				silent: true
			});
			child.stdout.on('data', function (data) {
				console.log(chalk.yellow(data));
			});
			child.on("close", function (code) {
				let param = process.argv.slice(3, 50).join(" ");
				console.log(param);
				const child = spawn("slap", [param], {shell: true, stdio: 'inherit'});
			});

		} else {
			let param = process.argv.slice(3, 50).join(" ");
			console.log(param);
			const child = spawn("slap", [param], {shell: true, stdio: 'inherit'});
		}

	}
}

Editor.description = `Edit any file just like in a real ide!
...
Just type hvn editor FILE
Default keybindings
Quit: Ctrl+Q
Movement: mouse or arrow keys and PageUp/Down/Home/End
Shift or click+drag to select, Ctrl/Alt to move faster
Save: Ctrl+S
Undo: Ctrl+Z, redo: Ctrl+Y
List open tabs: Ctrl+L
Next/previous tab: Ctrl+Alt+PageUp/Down
Close tab: Ctrl+W
Find: Ctrl+F
Go to line: Ctrl+G
Go to matching bracket: Ctrl+]
Open: Ctrl+O (or click the filebrowser)
New file: Ctrl+N
`;

module.exports = Editor;

