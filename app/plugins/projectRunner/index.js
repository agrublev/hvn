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
console.warn("INELISE");
	}

	async run() {
		// can get args as an object
		const {args} = this.args;
		console.log(`running my command with args: ${args.firstArg}, ${args.secondArg}`)
		// can also get the args as an array
		const {argv} = this.parse(MyCLI)
		console.log(`running my command with args: ${argv[0]}, ${argv[1]}`)
	}
}
