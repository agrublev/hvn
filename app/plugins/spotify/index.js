'use strict';
import React, { Component } from 'react';

module.exports = class Plugin {
    constructor (config) {
        this.config = config;
        let data = config.get();
        let self = this;
        this.matchers = {
            'play': true,
            'pause': false
        };
        const {search, activate, deactivate} = this;
        return {search, activate, deactivate};
    }

    search = async (query, items, e) => {
        let self = this;
        console.warn('aaaa', query, self.matchers);
        if (query === 'pause') {
            self.play(false);
            return {query: false, items: []};
        } else if (query === 'play') {
            self.play(true);
            return {query: false, items: []};
        } else {
            return {query: query, items: []};
        }
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

    activate () {
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
                resolve({
                    matcherList: false, render: '<div class="spotifyPlayer"><h2>' +
                        '<i class="fa ' + (isPlaying ? 'fa-play' : 'fa-pause') + '"> </i>' + currentTrack + '</h2>' +
                        '<div class="time">' + time + '</div>' +
                        '</div>'
                });
            });
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
