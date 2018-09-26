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
        let self = this;
        self.config = config;
        self.config.get();
        self.name = 'spotify';
        self.commands = {
            'play': {
                exec: () => self.play(true),
                render: <div onClick={() => {self.play(false);}} className="playMusic false">Pause</div>
            },
            'pause': {
                exec: () => self.play(false),
                render: <div onClick={() => {self.play(true);}} className="playMusic">Play</div>
            },
            'volume': {
                param: true, exec: (param) => self.volume(param),
                render: <div>
                    <div onClick={(props) => {
                        self.volume('up');
                    }} className="playMusic">Volume Up
                    </div>
                    <div onClick={(props) => {
                        self.activate('down');
                    }} className="playMusic">Volume Up
                    </div>
                </div>
            }
        };
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
            let time = '';
            let currentTrack = '';
            let concatData = '';
            child.stdout.on('data', function (data) {
                concatData += data.toString();
            });

            child.on('close', function (code) {
                let lines = concatData.split('\n');
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
                resolve([
                    <Player name="spotify" isPlaying={isPlaying} time={time} currentTrack={currentTrack}/>, Object.keys(self.commands).map((cm) => self.commands[cm].render)]);
            });
        });
    };

    play (too) {
        const {exec, spawn} = require('child_process');
        const path = require('path');
        const goTo = process.cwd() + '/spot.sh';
        spawn('sh ' + goTo + (too ? ' play' : ' pause'), {stdio: 'inherit', shell: true})
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
};
