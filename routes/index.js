'use strict';

const config = require('../config');
const mount = require('koa-mount');

function helper(app, router) {
    router
        .get('/healthcheck', function*(next) {
            this.body = {every: 'is ok', time: new Date(), env: '' + process.env.NODE_ENV};
        })
    ;
}

function api(app, router, parse) {
    require('./jeey')(app, router, parse);
}

module.exports = function (app, router, parse) {
    helper(app, router);
    api(app, router, parse);

    app
        .use(router.routes())
        .use(router.allowedMethods());
};