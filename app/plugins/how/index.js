'use strict';
import React, { Component } from 'react';

const stack = require('./stackget/index');
var google = require('./google');
module.exports = class Plugin {
    constructor (config) {
        this.config = config;
        let self = this;
        const {search, activate, deactivate} = this;
        return {search, activate, deactivate};
    }

    search (query, items, e) {
        let self = this;
        return new Promise(function (resolve, reject) {
            if (e.keyCode === 13) {
                let lang = 'en';
                const site = lang
                    ? `site:stackoverflow.com ${lang}`
                    : `site:unix.stackexchange.com`;

                google(`${site} ${query}`).then((nas) => {
                    console.log(nas);
                    let ns = new stack();
                    let theChosen = nas.links[0].href;
                    let neewr = theChosen.replace(/http(.*?)questions\//g, '');
                    let fullanswer = '';
                    let final;
                    ns.questions.answers({site: nas.links[0].href}, [neewr.split('/')[0]]).then((e) => {
                        console.log(e);
                        final = e.items.filter((z) => z.is_accepted)[0];
                        if (!final) {
                            final = e.items.sort((a, b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0));
                        }
                        final = final.pop();
                        fullanswer = '<div>';
                        fullanswer += '<div class="totalAnswer">';
                        fullanswer += '<a href="' + final.link + '">';
                        fullanswer += '<p>' + final.body_markdown.replace(/\n/g, '<br />') + '</p>';
                        fullanswer += ' <span class="link">' + final.link + '</span> </a></div>';

                        let newMap = nas.links.slice(0, 3).map((it) => {
                            let newItem = '<div><a href="' + it.href + '">';
                            newItem += '<h2>' + it.title + '</h2>';
                            newItem += '<p>' + it.description + '</p>';
                            newItem += ' <span class="link">' + it.href + '</span> </a></div>';
                            return newItem;
                        });

                        console.warn(newMap);
                        newMap.unshift(fullanswer);
                        resolve({query: false, items: newMap});

                    });

                });
            } else {
                resolve({query: query, items: []});
            }
        });
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

    activate = async () => {
        return {matcherList: {}, render: false};
    };

// let self = this;
    // return new Promise(function (resolve, reject) {
    //     const {execSync, spawn} = require('child_process');
    //     const path = require('path');
    //     const goTo = process.cwd() + '/spot.sh';
    //     let track;
    //     var child = spawn('sh', [goTo, 'track', '-p']);
    //     let isPlaying = true;
    //     //Everyday I Dream of You | Whilk & Misky
    //     // isPlaying
    //     // time: 1:14 - 4:3
    //     let time = '';
    //     let currentTrack = '';
    //     let concatData = '';
    //     child.stdout.on('data', function (data) {
    //         concatData += data.toString();
    //     });
    //
    //     child.on('close', function (code) {
    //         // child.stdout.on('data', function (data) {
    //         console.log('Finished with code ' + code);
    //
    //         // track = stdout.split('\n').filter((e) => e.charAt(0) !== '-' && e.indexOf('Now Playing') === -1)[0];
    //         let lines = concatData.split('\n');
    //         console.log(concatData);
    //         lines.forEach((line, indz) => {
    //             if (line.indexOf('Playing') !== -1) {
    //                 if (line.trim() === 'isNotPlaying') {
    //                     isPlaying = false;
    //                 }
    //             } else if (line.indexOf('time:') !== -1) {
    //                 time = line.trim();
    //             } else if (line.charAt(0) !== '-' && line.charAt(0) !== '[' && line.length > 7) {
    //                 currentTrack = line.trim();
    //             }
    //         });
    //         console.warn(isPlaying, currentTrack, time);
    //         resolve({
    //
    //         });
    //     });
    // });
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

    deactivate = () => {
        this.activePlugin = -1;
    };

    // function renderPreview(id, payload, render) {
    //     // you can render preview with HTML
    // }

    //, renderPreview
};
