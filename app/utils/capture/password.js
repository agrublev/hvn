/**
 * Password prompt example
 */

'use strict';
const {mainStory} = require('storyboard');
require('storyboard-preset-console');

const inquirer = require('inquirer');
const clear = require('clear');

const requireLetterAndNumber = value => {
	clear();
	mainStory.info('Hello world!');
	if (/\w/.test(value) && /\d/.test(value)) {
		return true;
	}
	return 'Password need to have at least a letter and a number';
};

inquirer
.prompt([
	{
		type: 'password',
		message: 'Enter a password',
		name: 'password1',
		validate: requireLetterAndNumber
	},
	{
		type: 'password',
		message: 'Enter a masked password',
		name: 'password2',
		mask: '*',
		validate: requireLetterAndNumber
	}
])
.then(answers => {
	mainStory.info('Hello world!');
	clear();

	mainStory.trace('Teeny-weeny detail: x = 3, y = 4');
	mainStory.debug('Called login()');
	mainStory.info('User "admin" authenticated successfully');
	mainStory.warn('Sad we can\'t show colors in GFM');
	mainStory.error('User "admin" could not be authenticated', { attach: {"zegfas":"2134sdf"} });
	mainStory.fatal('Ooops! Crashed! Mayday!', { attach: "THE NED" });
	console.log(JSON.stringify(answers, null, '  '))
});
