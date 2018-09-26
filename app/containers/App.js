import React, { Component } from 'react';

const Store = require('data-store');
const store = new Store({path: 'config.json'});
const plugins = require('../../package.json').plugins;
const pluginList = [];
const matchers = {};

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
    pluginList.push(new pluginInit(configStore(plug.short, store)));
    matchers[plug.prefix] = ix;
});
const {ipcRenderer} = require('electron');

export default class App extends Component {
    constructor (props) {
        super(props);
        console.log(store.data); //=> { one: 'two' }
        console.warn(pluginList[0].search('test 52', []));
        // console.warn(plugins);
        this.state = {
            isReady: 'asdasd',
            render: false,
            matchers: matchers,
            activePlugin: -1,
            items: []
        };
    }

    handleChange = (e) => {
        e.preventDefault();
        let self = this;
        console.log(e, self.ref.value);
        if (this.state.matchers[this.ref.value] !== undefined && self.state.activePlugin === -1) {
            // ACTIVATE PLUGIN
            pluginList[self.state.matchers[self.ref.value]].activate().then(({matcherList = false, render}) => {
                self.setState({
                    activePlugin: self.state.matchers[self.ref.value],
                    items: [],
                    matchers: matcherList,
                    render: render
                }, function () {
                    if (matcherList.query !== undefined) {
                        self.ref.value = matcherList.query;
                    } else {
                        self.ref.value = '';
                    }
                });
                // } else {
                //
                // }
            });
        } else {
            // clear PLUGIN
            if (e.keyCode === 8 && self.ref.value.length === 0) {
                this.setState({activePlugin: -1});
            } else if (self.state.activePlugin !== -1) {
                //
                pluginList[self.state.activePlugin].search(self.ref.value, self.state.items, e).then(({query, items}) => {
                    console.warn('----', query, items);

                    if (query !== false) {
                        self.ref.value = query;
                        self.setState({items: items || []});
                    } else {
                        pluginList[self.state.activePlugin].deactivate();
                        self.ref.value = '';
                        self.setState({
                            items: items || [],
                            matchers: matchers,
                            render: false,
                            activePlugin: -1
                        });
                    }

                });
            }
        }

        return false;
    };

    componentDidMount () {
        let self = this;
        ipcRenderer.on('ready', () => {
            self.setState({isReady: 'newRender' + Math.random()});
            const {remote} = require('electron');
            // remote.getCurrent().show();
        });
    }

    componentDidUpdate () {
        let self = this;
        setTimeout(function () {
            self.ref.focus();
        }, 300);
    }

    hide () {
        // const {remote} = require('electron');
        // remote.BrowserWindow.getAllWindows()[0].minimize();
    }

    render () {
        const {activePlugin, items, render} = this.state;
        return (
            <div id="wrap">
                <div id="frosty"></div>
                <div id="icon-wrap">
                    {activePlugin !== -1 ?
                        <i
                            className={'fa-3x ' + (plugins[activePlugin].icon)}
                            title={plugins[activePlugin].short}>

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
                    placeholder="start typing for commands..."
                    ref={(ref) => {this.ref = ref;}}
                    onKeyUp={(e) => this.handleChange(e)}
                />
                {items.length ? <ul className="itemList">
                    {items.map((item) => <li key={item} dangerouslySetInnerHTML={{__html: item}}/>)}
                </ul> : null}
                {render !== false ? <div dangerouslySetInnerHTML={{__html: render}}/> : null}
            </div>
        );
    }
}
