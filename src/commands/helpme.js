const {Command, flags} = require('@oclif/command')
const Table = require('tty-table');

class HelpMe extends Command {
	async run() {
		const header = [
			{
				value: "",
				headerColor: "cyan",
				color: "magenta",
				align: "left",
				paddingLeft: 1,
				width: 11
			},
			{
				value: "description",
				color: "blue",
				width: 45
			},
			{
				alias: "example",
				value: "organic",
				width: 30
			}
		];

//Example with arrays as rows
		const rows = [
			["command", "Get extra useful info about commands", "hvn command find lists how to" +
			" find stuff"],
			["howdoi", "Quickly ask any development question and get a perfect answer", "hvn" +
			" howdoi" +
			" start react server"],
			["deploy", "Literally deploys the current directory to a website for you in 3 seconds", "hvn deploy"],
			["task", "An easy way to run any of your npm scripts with yarn", "hvn command // will" +
			" run command promp"],
			["hvn", "Can be used to replace package.json with JSON5, meaning COMMENTS!", "hvn add" +
			" fkit"]
		];

		const t1 = Table(header, rows, {
			borderStyle: 1,
			borderColor: "blue",
			paddingBottom: 0,
			headerAlign: "center",
			align: "left",
			color: "white",
			truncate: false
		});

		let str1 = t1.render();
		console.log(str1);
	}
}

HelpMe.description = `Describe the command here
...
Extra documentation goes here
`

module.exports = HelpMe

