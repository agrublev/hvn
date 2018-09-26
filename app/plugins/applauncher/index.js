import React, { Component } from 'react';

const opn = require('opn');

const Applicatoin = (props) => <div>{props.name}</div>;
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
                self.items.push(<Applicatoin onSelected={(props) => {
                    console.warn('9-22  apps[item.props.name].filePath', self.apps[props.name]);
                    opn(self.apps[props.name].arg);
                }} name={app}/>);
                searchEngine.add('applauncher.' + self.apps[app].title, {name: self.apps[app].title});
            });
        }
        this.activePlugin = -1;
        // const {search, activate, render, deactivate} = this;
        // return {search, activate, render, deactivate, matchers};
        return this;
    }

    render = async (items) => {
        console.warn('RENDER');
        return this.items.filter((e) => items.indexOf(e.props.name) !== -1);
    };

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
