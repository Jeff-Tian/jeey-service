'use strict';

const jeey = require('../bll/jeey');
const tryAction = require('co-retry.js');
const errorHandlers = require('../error-handler/index');

module.exports = function (app, router, parse) {
    router
        .put('/api/jeey', function *(next) {
            let data = yield parse(this.request);
            this.body = yield tryAction(function *() {
                return (yield jeey.add(data))[0];
            }, 3, errorHandlers.handlers);
        })
    ;
};