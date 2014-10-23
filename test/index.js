
var _           = require('lodash'),
    ConsoleDot  = require('../.'),
    Should      = require('should');

describe('ConsoleDot Test Suite', function () {

    before(function initialize() {
        console = ConsoleDot();
    });

    describe('#callback()', function () {
        it('should expose a .callback() function', function (passed) {
            Should(console).have.property('callback');
            Should(console.callback).be.a.Function;
            passed();
        });

        describe('should produce desired output', function () {
            // http://stackoverflow.com/a/9624028
            var hook_stream = function(_stream, fn) {
                    var old_write = _stream.write;
                    _stream.write = fn;

                    return function() {
                        _stream.write = old_write;
                    };
                },
                trim_newline = function (collection) {
                    return _.map(collection, function (item) {
                        item = item.replace(/\n$/, '');
                        return item;
                    });
                },
                logs, unhook_stdout;

            beforeEach(function () {
                logs = [];
            });

            before(function () {
                unhook_stdout = hook_stream(process.stdout, function(string, encoding, fd) {
                    logs.push(string);
                });
            });

            after(function () {
                unhook_stdout();
            });

            it('should fire with the defaults', function (passed) {
                var cb = console.callback();

                cb();
                unhook_stdout();

                logs = trim_newline(logs);

                // well this is super tedious feeling
                logs.should.have.a.length(5);
                logs[0].should.eql(ConsoleDot.constants.DELIMETER);
                logs[1].should.eql(ConsoleDot.constants.MESSAGE);
                logs[2].should.eql(ConsoleDot.constants.SHOW_ARGS_MESSAGE);
                logs[3].should.eql('');
                logs[4].should.eql(ConsoleDot.constants.DELIMETER);

                passed();
            });

            it('2 should fire with the defaults', function (passed) {
                var cb = console.callback();

                cb();

                passed();
            });

        });
    });
});
