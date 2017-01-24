'use strict';

const dba = require('../dba');
const config = require('../config');

module.exports = {
    add: function *(jeeyData) {
        return yield dba.poolExecute(`INSERT INTO jeey (text) values (?);`, [jeeyData.text]);
    },
    get: function *(id) {
        return yield dba.poolExecute('SELECT id, text FROM jeey WHERE id = ?;', [id]);
    }
};