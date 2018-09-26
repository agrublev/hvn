'use strict';
const remote = window.require('electron').remote;
const dialog = remote.dialog;

module.exports = class Plugin {
    constructor (config) {
        this.config = config;
        this.data = config.get();
        const {search, activate} = this;
        return {search, activate};
    }

    search = (query, items, e) => {
        let self = this;
        return new Promise(function (resolve, reject) {
            // if waiting for name
            if (query.indexOf('Name:') !== -1) {
                if (e.keyCode === 13) {
                    // SAVE NAME
                    let project = {name: query.replace('Name:', '').trim()};
                    project.location = dialog.showOpenDialog({properties: ['openDirectory']});
                    if (self.data.projects === undefined) {
                        self.data['projects'] = [];
                    }
                    self.data.projects.push(project);
                    self.config.update(self.data);
                    self.activePlugin = -1;
                    // self.projectIndex = self.config.projects.findIndex((e) => e.location === projectLocation);
                    resolve({query: false, items: []});
                } else {
                    // wAITINT FOR NAME
                    resolve({query: query, items: ['Done', 'Cancel']});
                }
            }
            else {
                resolve({query: query, items: ['add', 'load']});
            }
        });

    };

    activate = async () => {
        return {matcherList: {query: 'Name: ', items: ['Done', 'Cancel']}};
    };
};
