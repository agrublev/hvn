import React, { Component } from 'react';
const add = require('./add');

const ProjectItem = (props) => <div>{props.name}</div>;
module.exports = class Plugin {
    constructor (searchEngine, config) {
        this.config = config;
        let data = config.get();
        let self = this;
        self.name = 'runner';
        self.commands = {
            'add': {exec: () => add()},
            'update': {exec: () => console.log('ASD')},
            'start': {exec: () => console.log('ASD')}
        };
        self.items = [];
        if (data.projects !== undefined && data.projects.length) {
            data.projects.forEach((prj) => {
                self.items.push(<ProjectItem name={prj.name}/>);
                searchEngine.add(self.name + '.' + prj.name, {name: prj.name});
            });
        }
        this.activePlugin = -1;
        return this;
    }

    render = (items) => {
        return this.items.filter((e) => items.indexOf(e.props.name) !== -1);
    };

    search = (query, items, e) => {
        let self = this;
        return new Promise(function (resolve, reject) {
            if (self.matchers[query] !== undefined && self.activePlugin === -1) {
                // ACTIVATE PLUGIN
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

};
