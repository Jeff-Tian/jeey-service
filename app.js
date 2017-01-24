const koa = require('koa');
const app = module.exports = koa();
const config = require('./config');
const router = require('koa-router')();
const parse = require('co-body');

require('./routes/')(app, router, parse);

app.on('error', function (err, ctx) {
    console.error('======= error ! ======');
    console.error(err);
    console.error('======= end error =======');
    // logger.error(err);
});

if (!module.parent) {
    const port = process.env.PORT || config.http.port || 11211;
    app.listen(port);

    console.log('Running %s site at: http://localhost:%d', process.env.NODE_ENV, port);
}