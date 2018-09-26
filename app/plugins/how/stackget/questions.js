'use strict';

/**
 * Required modules.
 */
var query = require('./query');

/**
 * Gets all the questions on the site or returns the questions identified in [ids].
 *
 * @param {Object} criteria
 * @param {Array} ids collection of IDs
 * @api public
 */
function questions (criteria, ids) {
    ids = ids || [];
    return query('questions/' + ids.join(';'), criteria);
}

/**
 * Gets the answers to a set of questions identified in [ids].
 *
 * @param {Object} criteria
 * @param {Array} ids collection of IDs
 * @api public
 */
function answers (criteria, ids) {
    if (!ids || !ids.length)
        return console.log('questions.answers lacks IDs to query');
    return query('questions/' + ids.join(';') + '/answers', criteria);
}

// Expose commands.
module.exports.questions = questions;
module.exports.answers = answers;
