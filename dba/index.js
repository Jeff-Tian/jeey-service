'use strict';

const config = require('../config');

let mysql = require('mysql');
let pool = mysql.createPool({
    connectionLimit: 10,
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});
function handleExecuteResult(cb) {
    return function (err, results, fields) {
        console.log('===========');
        console.log(err);
        console.log(results);
        console.log(fields);
        console.log('-----------');
        cb(err, results, fields);
    };
}

module.exports = {
    execute: function (statement, parameters) {
        return function (cb) {
            let conn = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.password
            });

            conn.connect();

            conn.query(statement, handleExecuteResult(cb));

            conn.end();
        };
    },

    poolExecute: function (statement, parameters) {
        console.log('>>> ', statement, parameters);
        return function (cb) {
            pool.query(statement, parameters, handleExecuteResult(cb));
        };
    }
};