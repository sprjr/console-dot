
var ConsoleDot = require('../.'),
    Should = require('should');

describe('ConsoleDot Test Suite', function () {

    before(function initialize() {
        console = ConsoleDot();
    })

    describe('#callback()', function () {
        it('should expose a .callback() function', function (done) {
            Should(console).have.property('callback');
            Should(console.callback).be.a.Function;
            done();
        });

        it('should do callbacky console.logs');
    });
});
