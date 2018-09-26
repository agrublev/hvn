'use strict';
const add = require('./add');

module.exports = class Plugin {
    constructor (config) {
        console.warn(config);
        this.config = config;
        let data = config.get();
        let self = this;
        this.matchers = {
            'add': new add(config)//,
        };
        if (data.projects !== undefined) {
            data.projects.forEach((project) => {
                self.matchers[project.name] = project.location;
            });
        }
        this.activePlugin = -1;
        const {search, activate, deactivate} = this;
        return {search, activate, deactivate};
    }

    search = (query, items, e) => {
        let self = this;
        return new Promise(function (resolve, reject) {
            if (self.matchers[query] !== undefined && self.activePlugin === -1) {
                // ACTIVATE PLUGIN
                console.warn('---', self.matchers, query);
                self.activePlugin = query;
                self.matchers[query].activate().then(({matcherList}) => {
                    resolve(matcherList);
                });
            } else if (self.activePlugin !== -1) {
                resolve(self.matchers[self.activePlugin].search(query, items, e));//
            } else {
                resolve({query: query, items: []});
            }
        });
    };

    activate = async () => {
        return {matcherList: this.matchers};
    };

    deactivate = () => {
        this.activePlugin = -1;
    };

    // function renderPreview(id, payload, render) {
    //     // you can render preview with HTML
    // }

    //, renderPreview
};
