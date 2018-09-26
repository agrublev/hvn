import React, { Component } from 'react';
import Mark from 'mark.js';

const path = require('path');
// const osApps = require('os-apps');
// const fileIcon = require('file-icon');

var options = {
    shouldSort: true,
    includeScore: true,
    includeMatches: true,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        'name'
    ]
};
import { DocumentIndex } from 'ndx';

const searchEngine = new DocumentIndex();
searchEngine.addField('name', {boost: 1});
const Store = require('data-store');
const store = new Store({path: 'config.json'});
const plugins = require('../../package.json').plugins;
const pluginList = {};
let matchers = [];

function configStore (name, store) {
    let itemName = name;
    if (store.get(itemName) === undefined) {
        store.set(itemName, {});
    }

    function update (newData) {
        // let newData = parameters.newData;
        store.set(itemName, newData);
    }

    function get () {
        return store.get(itemName);
    }

    return {update, get};
}

plugins.forEach(function (plug, ix) {
    if (store.data[plug.short] === undefined) {
        let plugData = {};
        plugData[plug.short] = {};
        store.set(plugData);
    }
    let pluginInit = require('../plugins/' + plug.short);
    let storeAccess = configStore(plug.short, store);
    let pluginData = new pluginInit(searchEngine, storeAccess);
    if (pluginData.commands) {
        Object.keys(pluginData.commands).forEach((matchMe) => {
            searchEngine.add(plug.short + '.' + matchMe, {name: matchMe});
        });
    }
    pluginList[plug.short] = pluginData;

    searchEngine.add(plug.short, {name: plug.short});
});
const {ipcRenderer} = require('electron');

export default class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isReady: 'asdasd',
            render: false,
            commandHistory: [],
            matchers: matchers,
            activePlugin: -1,
            items: []
        };
    }

    handleChange = async (e) => {
        e.preventDefault();
        let self = this;
        if ((e.key == 'ArrowUp' || e.key === 'Up') && self.state.commandHistory.length) {
            let last = self.state.commandHistory[self.state.commandHistory.length - 1];
            pluginList[last.plugin].commands[last.command].exec(last.value);
        }
        if (self.state.activePlugin !== -1) {
            let cmdVal = self.ref.value.split(' ');
            if (e.keyCode === 13) {
                if (self.state.activePlugin.commands[cmdVal[0]] !== undefined) {
                    self.state.activePlugin.commands[cmdVal[0]].exec(cmdVal[1] || '');
                    self.resetState(cmdVal[0], cmdVal[1]);
                }
            }
        } else {
            if (self.ref.value.slice(-1) === '.' && pluginList[self.ref.value.replace('.', '')] !== undefined) {
                let plugin = pluginList[self.ref.value.replace('.', '')];
                self.ref.value = '';
                self.setState({activePlugin: plugin});
                // TODO ACTIVATE THE PLUGIN FUNCTION
            } else {
                let result = searchEngine.search(self.ref.value);
                Promise.all(result.map(async (res) => {
                    let idCall = res.docId.split('.');
                    return pluginList[idCall[0]].render([idCall[1]]);
                })).then(values => {
                    self.setState({
                        items: values.reduce(
                            (accumulator, currentValue) => accumulator.concat(currentValue),
                            []
                        )
                    });//self.state.items.concat(items) || self.state.items});
                });
            }
        }

        return false;
    };

    resetState (command, value) {
        let self = this;
        self.ref.value = '';
        let newHistory = false;
        if (command !== undefined) {
            newHistory = self.state.commandHistory.slice();
            newHistory.push({
                plugin: self.state.activePlugin.name,
                command: command,
                value: value || ''
            });
        }
        self.setState({activePlugin: -1, items: [], commandHistory: newHistory || self.state.commandHistory});
    }

    componentDidMount () {
        let self = this;
        ipcRenderer.on('ready', () => {
            self.setState({isReady: 'newRender' + Math.random()});
        });
        let intc = setInterval(function () {
            if (self.ref !== null) {
                clearInterval(intc);
                self.ref.focus();
                self.ref.focus();
            }
        }, 100);
    }

    componentDidUpdate () {
        let self = this;
        let intc = setInterval(function () {
            if (self.ref !== null) {
                clearInterval(intc);
                self.ref.focus();
            }
        }, 100);
    }

    hide () {
        const {remote} = require('electron');
        remote.BrowserWindow.getAllWindows()[0].setOpacity(0.66);
    }

    focus () {
        const {remote} = require('electron');
        remote.BrowserWindow.getAllWindows()[0].setOpacity(0.95);
    }

    loadAnItem (props) {
        self = this;
        self.resetState();
    }

    render () {
        const {activePlugin, items, render} = this.state;
        // if(!this.ref.focused) {
        //
        // }
        return (
            <div id="wrap">
                <div className="titlebar webkit-draggable">
                    <div className="titlebar-stoplight">
                    </div>
                </div>
                <div id="frosty"></div>
                <div id="icon-wrap">
                    {activePlugin !== -1 ?
                        <i
                            className={'fa-3x ' + (activePlugin.icon)}
                            title={activePlugin.short}>

                        </i>
                        : <svg height="54px" width="54px" viewBox="0 0 64 64" xmlSpace="preserve">
                            <g fill="#fff" stroke="#fff" strokeLinecap="square" strokeWidth="2">
                                <path d="M62,32c0-12.2-9.8-22-22-22 c-10.2,0-18.7,6.9-21.2,16.3C17.9,26.1,17,26,16,26C8.3,26,2,32.3,2,40c0,7.7,6.3,14,14,14h26v-0.1C53.2,52.9,62,43.5,62,32z" fill="none" stroke="#fff"/>
                            </g>
                        </svg>}
                </div>

                <input type="text"
                    onBlur={() => this.hide()}
                    id="main-input"
                    onFocus={() => this.focus()}
                    placeholder="start typing for commands..."
                    ref={(ref) => {this.ref = ref;}}
                    onKeyUp={(e) => this.handleChange(e)}
                />
                {items.length ? <ul className="itemList">
                    {items.map((item, index) => <li key={index} onClick={() => this.loadAnItem(items[index].props)}>
                        {item}
                    </li>)}
                </ul> : null}
                {render !== false ? <div dangerouslySetInnerHTML={{__html: render}}/> : null}
            </div>
        );
    }
}
