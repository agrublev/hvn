const inquirer   = require('inquirer');
//
//     askGithubCredentials: () => {
//         const questions = [
//             // {
//             //     name: 'token',
//             //     type: 'input',
//             //     message: 'Enter your GitHub username or e-mail address:',
//             //     validate: function( value ) {
//             //         if (value.length) {
//             //             return true;
//             //         } else {
//             //             return 'Please enter your username or e-mail address.';
//             //         }
//             //     }
//             // },
//             {
//                 name: 'token',
//                 type: 'password',
//                 message: 'Enter your token:',
//                 validate: function(value) {
//                     if (value.length) {
//                         return true;
//                     } else {
//                         return 'Please enter your token.';
//                     }
//                 }
//             }
//         ];
//         return inquirer.prompt(questions);
//     },
// }
const files    = require('./files');

module.exports = {

    askGithubCredentials: () => {
        const questions = [
            {
                name: 'username',
                type: 'input',
                message: 'Enter your Github username or e-mail address:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your username or e-mail address.';
                    }
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'Enter your password:',
                validate: function(value) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your password.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },

    askRegeneratedToken: () => {
        const questions = [
            {
                name: 'token',
                type: 'input',
                message: 'Enter your new regenerated token:',
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter your new regenerated token:.';
                    }
                }
            }
        ];
        return inquirer.prompt(questions);
    },

    askRepoDetails: () => {
        const argv = require('minimist')(process.argv.slice(2));

        const questions = [
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the repository:',
                default: argv._[0] || files.getCurrentDirectoryBase(),
                validate: function( value ) {
                    if (value.length) {
                        return true;
                    } else {
                        return 'Please enter a name for the repository.';
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                default: argv._[1] || null,
                message: 'Optionally enter a description of the repository:'
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or private:',
                choices: [ 'public', 'private' ],
                default: 'public'
            }
        ];
        return inquirer.prompt(questions);
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