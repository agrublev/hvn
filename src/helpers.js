const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const cowsay = require("cowsay");
const lolcatjs = require('lolcatjs');
const inquirer = require('inquirer');
const Table = require('tty-table');


lolcatjs.options.seed = 160;
lolcatjs.options.colors = true;
lolcatjs.options.animate = true;
lolcatjs.options.force = true;
lolcatjs.options.duration = 6;
lolcatjs.options.speed = 32;
lolcatjs.options.spread = 12;
lolcatjs.options.frequency = 0.4;

const options = {};
const helper = {
	text: function (text) {
		lolcatjs.fromString(text);
	},
	donkey: function (text) {
		lolcatjs.fromString(cowsay.say({
			text: "Hope that answer works fo you!!",
			e: "oO",
			T: "U "
		}));
	},
	clear: function () {
		clear();
	},
	bigText: async function (text, shouldClear = true) {
		return new Promise(function (resolve) {
			if (shouldClear) {
				clear();
			}
			figlet.text(text, {
				font: "ANSI Shadow",// Three Point // Ogre
				horizontalLayout: 'full',
				verticalLayout: 'full'
			}, function (err, data) {
				if (err) {
					console.log('Something went wrong...');
					console.dir(err);
					return;
				}
				console.log(`
				
				`);
				lolcatjs.fromString(data);
				setTimeout(function () {
					if (shouldClear) {
						clear();
					}
					resolve();
					// startRead();
					//
					// howdoi("Start a react server");
					// var param = process.argv.slice(3, 50).join(" ");

					// if (process.argv[2] === "how2") {
					// 	howdoi(param);
					// 	// process.exit(-1);
					// } else if (process.argv[2] === "task") {
					// 	startRead();
					// } else if (process.argv[2] === "deploy") {
					// 	deploy();
					// } else if (process.argv[2] === "command") {
					// 	command(param);
					// } else if (process.argv[2] === "help" || process.argv[2] === "-h" ||
					// process.argv[2] === "--help") { help(); } else { runYarn(param); }
				}, 500);
			});
		});
	},
	sleep: async function (ms) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve();
			}, ms);
		});
	},
	whichScript: (filelist) => {
		const questions = [
			{
				type: 'list',
				name: 'run',
				message: 'Select the Task to run',
				choices: filelist
			}
		];
		return inquirer.prompt(questions);
	}
};
module.exports = helper;
//
//
// runYarn = function (args) {
// 	const spawn = require("child_process").spawn;
// 	const child = spawn("yarn", [args], options);
// 	// ngunes;
// 	// child.stdout.on("data", function(data) {
// 	//     console.log(data + "");
// 	// });
// 	// child.stderr.on("data", function(data) {
// 	//     console.log("stderr: " + data);
// 	// });
// 	child.on("close", function (code) {
// 		// clear();
// 		console.log(`
//
//
//         `);
// 		lolcatjs.fromString(cowsay.say({
// 			text: "Will miss you horridly!",
// 			e: "oO",
// 			T: "U "
// 		}));
// 		process.exit(code);
// 	});
//
// 	process.on("SIGTERM", () => {
// 		child.kill("SIGTERM");
// 	});
//
// 	process.on("SIGINT", () => {
// 		child.kill("SIGINT");
// 	});
// };
//
// const deploy = function () {
// 	const spawn = require("child_process").spawn;
// 	const child = spawn("surge", [""], {
// 		cwd: process.cwd(),
// 		detached: true,
// 		stdio: "inherit"
// 	});
// 	// child.stdout.on("data", function(data) {
// 	//     console.log(data + "");
// 	// });
// 	// child.stderr.on("data", function(data) {
// 	//     console.log("stderr: " + data);
// 	// });
// 	child.on("close", function (code) {
// 		// clear();
// 		console.log(`
//
//
//         `);
// 		lolcatjs.fromString(cowsay.say({
// 			text: "Enjoy your new website!!",
// 			e: "oO",
// 			T: "U "
// 		}));
// 		process.exit(code);
// 	});
//
// 	process.on("SIGTERM", () => {
// 		child.kill("SIGTERM");
// 	});
//
// 	process.on("SIGINT", () => {
// 		child.kill("SIGINT");
// 	});
// };
//
// const howdoi = function (param) {
//
// 	const spawn = require("child_process").spawn;
// 	const child = spawn("howdoi", [param], options);
// 	lolcatjs.fromString(cowsay.say({
// 		text: "Hope that answer works fo you!!",
// 		e: "oO",
// 		T: "U "
// 	}));
// 	console.log(`
//
//
//         `);
// 	child.stdout.on("data", function (data) {
// 		lolcatjs.fromString(data + "");
// 	});
// 	// child.stderr.on("data", function(data) {
// 	//     console.log("stderr: " + data);
// 	// });
// 	child.on("close", function (code) {
// 		// clear();
//
// 		process.exit(code);
// 	});
//
// 	process.on("SIGTERM", () => {
// 		child.kill("SIGTERM");
// 	});
//
// 	process.on("SIGINT", () => {
// 		child.kill("SIGINT");
// 	});
// };
//
//
// const startRead = () => readJson('./package.json', console.error, false, async function (er,
// data) { if (er) { console.error("There was an error reading the file"); return; } let scripts =
// Object.keys(data.scripts).map(sc => { return [sc, data.scripts[sc]]; //"§¬ ¯ ···
// ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯02F0˰˱˲˳˴˵˶˷˸˺˻˼˽˾˿Ͱ ͱ ͻ ͼͽ   " + data.scripts[sc]; }); scripts =
// evenOut(scripts); // console.log(scripts); // clear(); clear(); let ans = await
// inquirer.whichScript(scripts); let runme = ans.run.split("˼")[0]; runme = runme.replace("˻",
// ""); runYarn(runme); });  const evenOut = (items) => { let leftMax = items[0][0].length;
// items.forEach(it => { if (leftMax < it[0].length) { leftMax = it[0].length; } }); leftMax += 10;
// let newArr = []; items.forEach(it => { let needed = leftMax - it[0].length; it[0] = "˻" + it[0]
// + "˼" + new Array(needed).join(' '); newArr.push(it[0] + "˧ " + it[1] + ' Ͱ'); }); return
// newArr; };  const help = () => { const header = [ { value: "", headerColor: "cyan", color:
// "magenta", align: "left", paddingLeft: 1, width: 11 }, { value: "description", color: "blue",
// width: 45 }, { alias: "example", value: "organic", width: 30 } ];  //Example with arrays as rows
// const rows = [ ["command", "Get extra useful info about commands", "hvn command find lists how
// to" + " find stuff"], ["how2", "Quickly ask any development question and get a perfect answer",
// "hvn howdoi" + " start react server"], ["deploy", "Literally deploys the current directory to a
// website for you in 3 seconds", "hvn deploy"], ["task", "An easy way to run any of your npm
// scripts with yarn", "hvn command // will" + " run command promp"], ["hvn", "Can be used to
// replace package.json with JSON5, meaning COMMENTS!", "hvn add" + " fkit"] ];  const t1 =
// Table(header, rows, { borderStyle: 1, borderColor: "blue", paddingBottom: 0, headerAlign:
// "center", align: "left", color: "white", truncate: false });  let str1 = t1.render();
// console.log(str1);   var t2 = Table(header, rows, { borderStyle: 1, paddingBottom: 0,
// headerAlign: "center", align: "center", color: "white" });  var str2 = t2.render();
// console.log(str2);   //template literals let header3 = [ {value: 'name', width: 30, headerAlign:
// 'left'}, {value: 'price', width: 30, headerAlign: 'left'} ];  const opts = { align: 'left' };
// const data = [ [`apple ${chalk.red("mac")}`, 92.50], ["ibm", 120.15] ];  let t3 = Table(header3,
// data, opts); console.log(t3.render());
// }
// ;
//
// /***
//  * EXEV
//  */
//

// const run = async () => {
//     try {
//         // Retrieve & Set Authentication Token
//         const token = await getGithubToken();
//         github.githubAuth(token);
//
//         // Create remote repository
//         const url = await repo.createRemoteRepo();
//
//         // Create .gitignore file
//         await repo.createGitignore();
//
//         // Setup local repository and push to remote
//         const done = await repo.setupRepo(url);
//         if (done) {
//             console.log(chalk.green("All done!"));
//         }
//     } catch (err) {
//         if (err) {
//             switch (err.code) {
//                 case 401:
//                     console.log(chalk.red("Couldn't log you in. Please provide correct
// credentials/token.")); break; case 422: console.log(chalk.red("There already exists a remote
// repository with the same name")); break; default: console.log(err); } } } };  run();
//"§¬ ¯ ··· ˠˡˢˣˤ˥˦˧˨˩˪˫ˬ˭ˮ˯02F0˰˱˲˳˴˵˶˷˸˺˻˼˽˾˿Ͱ ͱ ͻ ͼͽ   " +
