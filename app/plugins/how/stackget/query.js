'use strict';

var config = require('./config'),
    parser = require('./parser'),
    request = require('request'),
    url = require('url');

/**
 * Execute a query after checkign if criteria are available.
 *
 * @param {String} destination query method
 * @param {Object} criteria parameters to query against
 * @api private
 */
module.exports = function query(destination, criteriaz) {
    let criteria = {filter: '!-*f(6s6U8Q9b', site: 'stackoverflow'};
    // Query against the predefined website and construct the endpoint.
    // criteria.site = config.get('site');
    var endpoint = url.format({
        protocol: "https",
        host: 'api.stackexchange.com',
        pathname: '/2.2/' + destination,
        query: criteria
    });
    return new Promise((resolve, reject) => request({
        url: endpoint,
        encoding: null
    }, (error, res) => {
        if (error) {
            reject(error);
        } else {
            parser.parseBody(res.body, (err, body) => err
                ? reject(err)
                : resolve(body));
        }
    }))
};
