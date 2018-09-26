'use strict';
import React, { Component } from 'react';

const Player = (props) => {
    const {currentTrack, isPlaying, time} = props;
    return (<div className="spotifyInfo">
        <h2>
            <i className={'fa ' + (isPlaying ? 'fa-play' : 'fa-pause')}> </i>
            {currentTrack} </h2>
        <div className="time">{time}</div>
    </div>);
};

module.exports = class Plugin {
    constructor (searchEngine, config) {
        this.config = config;
        let data = config.get();
        let self = this;
        self.name = 'spotify';
        self.commands = {
            'play': {exec: () => self.play(true)},
            'pause': {exec: () => self.play(false)},
            'volume': {param: true, exec: (param) => self.volume(param)}
            // 'volume.down': {exec: () => self.volume(false)},
            // 'volume.$volume': {exec: () => self.volume(volume)}
        };
        // const matchers = Object.keys(self.commands);
        // const {search, commands, render} = this;
        return this;
    }

    render = async () => {
        let self = this;
        return new Promise(function (resolve, reject) {

            const {execSync, spawn} = require('child_process');
            const path = require('path');
            const goTo = process.cwd() + '/spot.sh';
            let track;
            var child = spawn('sh', [goTo, 'track', '-p']);
            let isPlaying = true;
            //Everyday I Dream of You | Whilk & Misky
            // isPlaying
            // time: 1:14 - 4:3
            let time = '';
            let currentTrack = '';
            let concatData = '';
            child.stdout.on('data', function (data) {
                concatData += data.toString();
            });

            child.on('close', function (code) {
                // child.stdout.on('data', function (data) {
                console.log('Finished with code ' + code);

                // track = stdout.split('\n').filter((e) => e.charAt(0) !== '-' && e.indexOf('Now Playing') === -1)[0];
                let lines = concatData.split('\n');
                console.log(concatData);
                lines.forEach((line, indz) => {
                    if (line.indexOf('Playing') !== -1) {
                        if (line.trim() === 'isNotPlaying') {
                            isPlaying = false;
                        }
                    } else if (line.indexOf('time:') !== -1) {
                        time = line.trim();
                    } else if (line.charAt(0) !== '-' && line.charAt(0) !== '[' && line.length > 7) {
                        currentTrack = line.trim();
                    }
                });
                console.warn(isPlaying, currentTrack, time);
                resolve([<Player name="spotify" isPlaying={isPlaying} time={time} currentTrack={currentTrack}/>,
                    <div onSelected={() => {self.activate('play');}} className="playMusic">Playu the music boy</div>,
                    <div onSelected={() => {self.activate('pause');}} className="playMusic false">STOP IT MAN</div>]);
                // resolve({
                //     matcherList: false, render:
                // });
            });
        });
    };

    search = async (query, items, e) => {
        // let self = this;
        // console.warn('aaaa', query, self.matchers);
        // if (query === 'pause') {
        //     self.play(false);
        //     return {query: false, items: []};
        // } else if (query === 'play') {
        //     self.play(true);
        //     return {query: false, items: []};
        // } else {
        //     return {query: query, items: []};
        // }
        // if (this.matchers[query] !== undefined) {
        //     let run = self.matchers[query];
        //     run();

        // } else {
        //
        // }
    };

    play (too) {
        const {exec, spawn} = require('child_process');
        const path = require('path');
        const goTo = process.cwd() + '/spot.sh';
        // console.error('sh ' + goTo + (too ? ' play' : 'pause');
        spawn('sh ' + goTo + (too ? ' play' : ' pause'), {stdio: 'inherit', shell: true})
        .on('exit', function (error) {
            if (!error) {
                console.log('Success!');
            } else {
                console.log('ERRIR!');
            }
        });
    }

    volume (updown) {
        const {spawn} = require('child_process');
        const goTo = process.cwd() + '/spot2.sh';
        spawn('sh ' + goTo + ' vol ' + (updown === 'up' ? ' up' :
            updown === 'down' ? ' down' : updown), {stdio: 'inherit', shell: true})
        .on('exit', function (error) {
            if (!error) {
                console.log('Success!');
            } else {
                console.log('ERRIR!');
            }
        });
    }

    activate (command) {
        let too = command === 'play';
        const {exec, spawn} = require('child_process');
        const path = require('path');
        const goTo = process.cwd() + '/spot.sh';
        // console.error('sh ' + goTo + (too ? ' play' : 'pause');
        spawn('sh ' + goTo + (too ? ' play' : ' pause'), {stdio: 'inherit', shell: true})
        .on('exit', function (error) {
            if (!error) {
                console.log('Success!');
            } else {
                console.log('ERRIR!');
            }
        });

        // let runit = await execSync(,
        //     (error, stdout, stderr) => {
        //
        //         console.warn('RETURN)', track[0]);
        //         return track;
        //         if (error !== null) {
        //             console.log(`exec error: ${error}`);
        //         }
        //         console.log(`${stderr}`);
        //     }
        // );
        // console.warn(runit, track, result);
        // }
        //
        // spawn(, {stdio: 'inherit', shell: true})
        //     .on('exit', function (error) {
        //         if (!error) {
        //             console.log('Success!', error);
        //         } else {
        //             console.log('ERRIR!', error);
        //         }
        //     });

    };

    deactivate = () => {
        this.activePlugin = -1;
    };

    // function renderPreview(id, payload, render) {
    //     // you can render preview with HTML
    // }

    //, renderPreview
};
