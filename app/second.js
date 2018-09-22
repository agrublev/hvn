const program = require('commander');
//
// var program = require('commander');
module.exports = class heaven {
	constructor(args) {

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
