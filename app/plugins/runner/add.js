'use strict';

module.exports = function add (query, items, e) {
    let self = this;
    return new Promise(function (resolve, reject) {
        // if waiting for name
        if (query.indexOf('Name:') !== -1) {
            if (e.keyCode === 13) {
                // SAVE NAME
                const remote = require('electron').remote;
                const dialog = remote.dialog;
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
