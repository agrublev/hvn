import React, { Component } from 'react';

const opn = require('opn');

const path = require('path');
// TODO ACTIVE APPS osascript -e 'tell application "System Events" to get name of (processes where background only is false)'
const osApps = require('os-apps');
const fileIcon = require('file-icon');
//
// const toItem = filePath => new Promise((resolve) => {
//     const fileName = path.basename(filePath, path.extname(filePath));
//     fileIcon.buffer(fileName, {size: 52}).then((buffer) => {
//         store.set('applications.' + fileName, {
//             title: fileName,
//             arg: filePath,
//             icon: {
//                 type: 'file',
//                 path: `data:image/png;base64,${buffer.toString('base64')}`
//             }
//         });
//     });
// });
// // osApps.getAll()
// .then((apps) => {
//     console.warn('8-40  apps', apps);
//     apps.forEach((i) => {
//         toItem(i);
//     });
// });

// const Store = require('data-store');
// const store = new Store({path: 'config.json'});
// console.warn(store.data);
const Application = (props) => <div onClick={() => {
    opn(props.file);
    return true;
}} className="openApp"><img src={props.icon}/> <h2>{props.name}</h2></div>;
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
            let count = Object.keys(self.apps).length;
            Object.keys(self.apps).forEach((app) => {
                // fileIcon.buffer(self.apps[app].arg, 128).then((buffer) => {
                //     self.apps[app].icon = {
                //         type: 'file',
                //         path: `data:image/png;base64,${buffer.toString('base64')}`
                //     };
                //
                //     stores.set('applauncher.applications', self.apps);
                //
                // });
                self.items.push(<Application file={self.apps[app].arg} icon={self.apps[app].icon.path} name={app}/>);
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
