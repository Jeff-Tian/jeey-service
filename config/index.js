'use strict';
let fs = require('fs');

let config = require('./config_' + (process.env.NODE_ENV || 'dev'));

let dbFile = __dirname + '/../db.json';

if (fs.existsSync(dbFile)) {
    let db = JSON.parse(fs.readFileSync(dbFile, 'utf-8'));

    config.db = Object.assign(config.db, db);
}

module.exports = config;