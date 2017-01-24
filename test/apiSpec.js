'use strict';

let prepare = require('./helper/prepare');
let It = prepare.It;

describe('jeey api', function () {
    after(prepare.tearDown);

    It.get('/healthcheck', {}, 200, /is ok/);
    It.put('/api/jeey', {
        text: 'hello'
    }, 200, function (res) {
        if (res.body.affectedRows !== 1) {
            throw new Error('affected rows should be 1, got: ' + res.body.affectedRows);
        }
    });
});