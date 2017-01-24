'use strict';

const dba = require('../dba');
const config = require('../config');

module.exports = {
    add: function *(jeeyData) {
        console.log('>>>>>>>>>>>>>')
        console.log(jeeyData);
        console.log('<<<<<<<<<<<<<');
        return yield dba.poolExecute(`INSERT INTO ${config.db.database}.jeey (text) values (?);`, [jeeyData.text]);
    }
};