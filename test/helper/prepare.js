'use strict';

let config = require('../../config');
config.db.database += '_test';

let assert = require('assert'),
    request = require('co-supertest'),
    app = require('../../app');

require('co-mocha');

let server = app.listen();
let timeout = 20000;

function *testRouter(method, path, data, expectedStatusCode, expectedPattern) {
    yield        startTestRouter(method, path, data)
        .expect(expectedStatusCode).expect(expectedPattern)
        .end();
}

function startTestRouter(method, path, data) {
    console.error('------- >>>>>> start test router: ', method, path, data);
    return request(server)[method](path).send(data);
}

function It(method, path, data, expectedStatusCode, expectedPattern) {
    let message = method + ' ' + path;

    it(message, function *() {
        this.timeout(timeout);
        yield testRouter(method, path, data, expectedStatusCode, expectedPattern);
    });
}

['get', 'post', 'put', 'delete'].map(function (method) {
    It[method] = function (path, data, expectedStatusCode, expectedPattern) {
        It(method, path, data, expectedStatusCode, expectedPattern);
    };
});

module.exports = {
    It: It,

    assertPresent: function (message, actual) {
        if (!actual) {
            throw new Error('testing ' + message + ' should be present, but got: ' + actual);
        }
    },
    assertEqual: function (message, expected, actual, extra) {
        if (expected !== actual) {
            throw new Error('testing ' + message + ' expected: ' + expected + ' but actually got: ' + actual + (extra ? '. Extra Info: ' + JSON.stringify(extra, null, 4) : ''));
        }
    },
    tearDown: function*() {
        this.timeout(timeout);
        const dba = require('../../dba');
        yield dba.poolExecute('DROP DATABASE IF EXISTS ' + config.db.database, []);
    },
    startTestRouter: startTestRouter
};