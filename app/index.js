// const {prompt} = require("./utils/capture/input");
// const heaven = require("./second");
// const chalkPipe = require('chalk-pipe');
const {mainStory} = require('storyboard');
mainStory.info('Hello world!');
// let me = [
// 	{
// 		type: 'input',
// 		name: 'first_name',
// 		message: "What's your first name"
// 	},
// 	{
// 		type: 'input',
// 		name: 'last_name',
// 		message: "What's your last name",
// 		default: function () {
// 			return 'Doe';
// 		}
// 	},
// 	{
// 		type: 'input',
// 		name: 'fav_color',
// 		message: "What's your favorite color",
// 		transformer: function (color, answers, flags) {
// 			const text = chalkPipe(color)(color);
// 			if (flags.isFinal) {
// 				return text + '!';
// 			}
// 			return text;
// 		}
// 	},
// 	{
// 		type: 'input',
// 		name: 'phone',
// 		message: "What's your phone number",
// 		validate: function (value) {
// 			mainStory.info('Hello world!', value);
// 			var pass = value.match(
// 				/^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
// 			);
// 			if (pass) {
// 				return true;
// 			}
// 			mainStory.info('Hello world!');
// 			return 'Please enter a valid phone number';
// 		}
// 	}
// ];

// prompt(me).then((res) => {console.warn(res)}).catch(function (e) {
// 	mainStory.info('Hello world!asdasd');
// 	console.warn("12-47  iofjiosdf", e);
// })


// TODO
// Check yarn or npm and ask user to choose
// check if nodes modules
// show list of possible runnable scripts
// on choice store in config file his default choice for this project
// update choice by running project run --rebuild

/**
 * Run any project by getting a list of the possible runnable systems
 * - npm
 * - yarn
 * - gulp
 * - etc
 * @type {module.run}
 */
module.exports = class run {
	constructor(args) {
		mainStory.info('Hello world!');
	}

	async run() {
		// can get args as an object
		const {args} = this.args;
		mainStory.info('Hello worlsdd!',this.args);
		console.log(`running my command with args: ${args.firstArg}, ${args.secondArg}`)
		// can also get the args as an array
		const {argv} = this.parse(MyCLI)
		console.log(`running my command with args: ${argv[0]}, ${argv[1]}`)
	}
}
