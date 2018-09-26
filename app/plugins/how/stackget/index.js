'use strict';

var config = require('./config'),
    questions = require('./questions');

/**
 * Initialize StackExchange API.
 *
 * @Constructor
 * @param {Object} options
 * @api public
 */
module.exports = function StackExchange () {

    let options = {
            version: 2.2
        },
        SPINNER_OPTIONS = {
            doNotBlock: true
        };
    // Mitigate options to config.
    this.config = config;
    Object
    .keys(options || {})
    .forEach(function setConfig (key) {
        config.set(key, options[key]);
    });

    // Expose methods.
    this.questions = questions;
};
