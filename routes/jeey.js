'use strict';

const jeey = require('../bll/jeey');
const tryAction = require('co-retry.js');
const errorHandlers = require('../error-handler/index');

module.exports = function (app, router, parse) {
    router
        .put('/api/jeey', function *(next) {
            let data = yield parse(this.request);
            this.body = yield tryAction(function *() {
                return (yield jeey.add(data));
            }, 3, errorHandlers.handlers);
        })
        .get('/api/jeey/:id', function*(next) {
            let id = this.params.id;
            this.body = (yield jeey.get(id))[0];
        })
    ;
};