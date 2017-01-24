'use strict';

let prepare = require('./helper/prepare');
let It = prepare.It;

describe('healthcheck', function () {
    It.get('/healthcheck', {}, 200, /is ok/);
});

describe('jeey api', function () {
    after(prepare.tearDown);

    it('can save jeey and read it', function *() {
        let insertId = null;

        yield prepare.startTestRouter('put', '/api/jeey', {text: 'hello'})
            .expect(200)
            .expect(function (res) {
                prepare.assertPresent('inserted id should be present', res.body.insertId);
                if (res.body.affectedRows !== 1) {
                    throw new Error('affected rows should be 1, got: ' + res.body.affectedRows);
                }

                insertId = res.body.insertId;
            });

        yield  prepare.startTestRouter('get', `/api/jeey/${insertId}`, {})
            .expect(200)
            .expect({id: 1, text: 'hello'});
    });
});