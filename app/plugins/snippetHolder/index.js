// TODO
// Check yarn or npm and ask user to choose
// check if nodes modules
// show list of possible runnable scripts
// on choice store in config file his default choice for this project
// update choice by running project run --rebuild
const editJsonFile = require('edit-json-file');

/**
 * Run any project by getting a list of the possible runnable systems
 * - npm
 * - yarn
 * - gulp
 * - etc
 * @type {module.run}
 */

class SnippetHolder {
    constructor (hvn) {
        let self = this;
        self.hvn = hvn;

        self.hvn.program
        .command('snip')
        .description('save a snippet')
        // .option('-u, --update', 'Which setup mode to use')
        // .option('-c, --custom', 'Which setup asduse')
        .action(function (env, options) {
            self.run();
        });
    }

    run (program) {
        let {hvn} = this;
        let self = this;

        const customInput = require('../../utils/customInput');
        customInput([{
            type: 'input',
            name: 'name',
            message: 'Name of snippet'
        },
            {
                type: 'editor',
                name: 'snippet',
                message: 'Snippet Content'
            }
        ], function (item) {
            if(hvn.store.snippets === undefined) {
                hvn.store.set('snippets', [{name:item.name,content:item.snippet}]);
            } else {
                hvn.store.snippets.push({name:item.name,content:item.snippet});
                hvn.store.set('snippets', hvn.store.snippets);
            }

            /*
hvn.store = new Store({ path: 'config.json' });
hvn.store.set('one', 'two');
hvn.store.set({ c: 'd' });
console.log(hvn.store.data); //=> { one: 'two' }
hvn.store.set('x.y.z', 'boom!');
console.log(hvn.store.get());
console.log(hvn.store.data);
 */

        });

        // var child = exec(hvn.package.hvn.run, {async: true})
        // child.stdout.on('data', function (data) {
        //   console.log(data)
        //   /* ... do something with data ... */
        // })
        // child.stdout.on('close', function (data) {
        //   console.log(data)
        //   process.exit(0)
        // })
    }
}

// let app = new App()
module.exports = SnippetHolder;
