'use strict';

const config = require('../config');
const dbScriptRunner = require('./db-script-runner');

let handlers = [{
    error: `ER_BAD_DB_ERROR: Unknown database '${config.db.database}'`,
    handler: dbScriptRunner.executeScriptInvoker('create-database')
}, {
    error: `ER_NO_SUCH_TABLE: Table '${config.db.database}.jeey' doesn't exist`,
    handler: dbScriptRunner.poolExecuteScriptInvoker('create-table-jeey')
}];

let handleException = function (context, ex) {
    context.throw(502, ex.message, {error: ex});
};

module.exports = {
    handlers: handlers,
    handleException: handleException
};