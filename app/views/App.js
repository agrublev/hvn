import React, { Component } from 'react';
import Mark from 'mark.js';

const path = require('path');
const osApps = require('os-apps');
const fileIcon = require('file-icon');

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
        'name' //,
        // "author.firstName"
    ]
};
import { DocumentIndex } from 'ndx';

const searchEngine = new DocumentIndex();
searchEngine.addField('name', {boost: 1});
// const searchEngine = Lunr(function () {
//     this.ref('name');
//     this.field('name');
//     //
//     // documents.forEach(function (doc) {
//     //     this.add(doc);
//     // }, this);
// });

const Store = require('data-store');
const store = new Store({path: 'config.json'});
const plugins = require('../../package.json').plugins;
const pluginList = {};
let matchers = [];
//
// store.set('applications', {});
//
// const toItem = filePath => new Promise((resolve) => {
//     const fileName = path.basename(filePath, path.extname(filePath));
//     // fileIcon.buffer(fileName, 128).then((buffer) => {
//         store.set('applications.' + fileName, {
//             title: fileName,
//             subtitle: filePath,
//             arg: filePath,
//             // icon: {
//             //     type: 'file',
//             //     path: `data:image/png;base64,${buffer.toString('base64')}`
//             // }
//         });
//     // });
// });
// osApps.getAll()
// .then((apps) => {
//     console.warn('8-40  apps', apps);
//     apps.forEach((i) => {
//         toItem(i).then((th) => {
//             // store.set('applications', ));
//         });
//     });
// });


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

const router = {};
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
        console.warn('8-22  EXPAND', e.key, self.state.commandHistory);
        if ((e.key == 'ArrowUp' || e.key === 'Up') && self.state.commandHistory.length) {
            let last = self.state.commandHistory[self.state.commandHistory.length - 1];
            console.warn('8-22  EXPAND', last);
            pluginList[last.plugin].commands[last.command].exec(last.value);
        }
        if (self.state.activePlugin !== -1) {
            let cmdVal = self.ref.value.split(' ');
            if (e.keyCode === 13) {
                if (self.state.activePlugin.commands[cmdVal[0]] !== undefined) {
                    console.log(e.keyCode, self.ref.value);
                    console.warn(cmdVal[1]);
                    self.state.activePlugin.commands[cmdVal[0]].exec(cmdVal[1] || '');
                    // if (self.state.activePlugin.commands[cmdVal].param !== true) {
                    // self.state.activePlugin.commands[self.ref.value].exec();
                    self.ref.value = '';
                    let newHistory = self.state.commandHistory.slice().push({
                        plugin: self.state.activePlugin.name,
                        command: cmdVal[0],
                        value: cmdVal[1] || ''
                    });
                    self.setState({activePlugin: -1, items: [], commandHistory: newHistory});
                    // }
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
                console.warn('9-6  REWS', result);
                // result.forEach(async (res) => {
                //     let idCall = res.docId.split('.');
                //     // pluginList[idCall[0]].render([idCall[1]]);
                //     //let items = await
                //     console.warn('9-3  0901', idCall, pluginList);
                //     pluginList[idCall[0]].render([idCall[1]]).then((items) => {
                //         console.warn('aa', items);
                //         self.setState({items: items ? self.state.items.concat(items) || self.state.items});
                //     });
                // });
                let idCall = result[0].docId.split('.');
                pluginList[idCall[0]].render(result.map((e) => e.docId.split('.')[1])).then((items) => {
                    console.warn('aa', items);
                    //self.state.items.concat(
                    //)
                    self.setState({items: items || []});
                });
            }
        }

        //     // ACTIVATE PLUGIN
        //     pluginList[self.state.matchers[self.ref.value]].activate().then(({matcherList = false, render}) => {
        //         self.setState({
        //             activePlugin: self.state.matchers[self.ref.value],
        //             items: [],
        //             matchers: matcherList,
        //             render: render
        //         }, function () {
        //             if (matcherList.query !== undefined) {
        //                 self.ref.value = matcherList.query;
        //             } else {
        //                 self.ref.value = '';
        //             }
        //         });
        //         // } else {
        //         //
        //         // }
        //     });
        // } else {
        //     // clear PLUGIN
        //     if (e.keyCode === 8 && self.ref.value.length === 0) {
        //         this.setState({activePlugin: -1});
        //     } else if (self.state.activePlugin !== -1) {
        //         //
        //         pluginList[self.state.activePlugin].search(self.ref.value, self.state.items, e).then(({query, items}) => {
        //             console.warn('----', query, items);
        //
        //             if (query !== false) {
        //                 self.ref.value = query;
        //                 self.setState({items: items || []});
        //             } else {
        //                 pluginList[self.state.activePlugin].deactivate();
        //                 self.ref.value = '';
        //                 self.setState({
        //                     items: items || [],
        //                     matchers: matchers,
        //                     render: false,
        //                     activePlugin: -1
        //                 });
        //             }
        //
        //         });
        //     }
        // }

        return false;
    };

    componentDidMount () {
        let self = this;
        ipcRenderer.on('ready', () => {
            self.setState({isReady: 'newRender' + Math.random()});
            // const {remote} = require('electron');
            // remote.getCurrent().setOpacity(1);
            // remote.getCurrent().show();
        });
        let intc = setInterval(function () {
            if (self.ref !== null) {
                clearInterval(intc);
                // remote.getCurrent().show();
                self.ref.focus();
                self.ref.focus();
            }
        }, 100);
    }

    componentDidUpdate () {
        console.warn('TE22S1T');

        let self = this;
        let intc = setInterval(function () {
            if (self.ref !== null) {
                clearInterval(intc);
                // const {remote} = require('electron');
                // remote.getCurrent().focus();
                // remote.getCurrent().show();
                // self.ref.focus();
                self.ref.focus();
            }
        }, 100);
    }

    hide () {
        const {remote} = require('electron');
        remote.BrowserWindow.getAllWindows()[0].setOpacity(0.66);
        console.warn('T3333ES1T');

        // remote.BrowserWindow.getAllWindows()[0].minimize();
    }

    focus () {
        const {remote} = require('electron');
        remote.BrowserWindow.getAllWindows()[0].setOpacity(0.95);
    }

    loadAnItem (props) {
        //items[index].
        props.onSelected(props);
    }
    render () {
        const {activePlugin, items, render} = this.state;
        // if(!this.ref.focused) {
        //
        // }
        console.warn('TES1T');
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
