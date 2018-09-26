import React, { Component } from 'react';

const opn = require('opn');

const Application = (props) => <div>{props.name}</div>;
module.exports = class Plugin {
    constructor (searchEngine, config) {
        this.config = config;
        let data = config.get();
        let self = this;
        self.name = 'applauncher';
        self.items = [];
        self.apps = config.get();
        self.apps = self.apps['applications'];
        if (self.apps !== undefined) {
            Object.keys(self.apps).forEach((app) => {
                self.items.push(<Application onClick={(props) => {
                    console.warn('9-22  apps[item.props.name].filePath', self.apps[props.name]);
                    opn(self.apps[props.name].arg);
                    return true;
                }} name={app}/>);
                searchEngine.add('applauncher.' + self.apps[app].title, {name: self.apps[app].title});
            });
        }
        this.activePlugin = -1;
        return this;
    }

    render = async (items) => {
        console.warn('RENDER');
        return this.items.filter((e) => items.indexOf(e.props.name) !== -1);
    };
};
