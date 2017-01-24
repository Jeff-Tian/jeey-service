'use strict';

const config = require('../config');
const fs = require('fs');
const dba = require('../dba');
const util = require('util');

function getSql(scriptName) {
    let filePath = './db-scripts/' + scriptName + '_' + (process.env.NODE_ENV || 'dev') + '.sql';
    if (!fs.existsSync(filePath)) {
        filePath = './db-scripts/' + scriptName + '.sql';
    }

    return fs.readFileSync(filePath, 'utf-8').replace('{{database}}', config.db.database);
}

function coInvoker(method, scriptName) {
    return function *() {
        yield method(getSql(scriptName), []);
    };
}

function* batchScript(scriptName) {
    let cql = getSql(scriptName);

    let statements = cql
        .replace(/\{\{keyspace}}/g, config.db.keyspace)
        .split(';')
        .map(function (s) {
            return s.replace(/^[\s\r\n]/g, '');
        })
        .filter(function (s) {
            return s.length > 0;
        });

    for (var i = 0; i < statements.length; i++) {
        yield dba.poolExecute(statements[i]);
    }
}

module.exports = {
    poolExecuteScriptInvoker: function (scriptName) {
        return coInvoker(dba.poolExecute, scriptName);
    },

    executeScriptInvoker: function (scriptName) {
        return coInvoker(dba.execute, scriptName);
    }
};