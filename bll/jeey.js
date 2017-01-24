'use strict';

const jeeyDal = require('../dal/jeey');

module.exports = {
    add: function *(jeeyData) {
        return yield jeeyDal.add(jeeyData);
    },

    get: function *(id) {
        return yield jeeyDal.get(id);
    }
};