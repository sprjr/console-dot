
var _           = require('lodash'),
    ConsoleDot  = require('../.'),
    Should      = require('should'),
    Util        = require('util');

describe('ConsoleDot Test Suite', function () {

    var originalConsole = console;

    before(function initialize() {
        console = ConsoleDot();
    });

    describe('#callback()', function () {

        describe('Definition & API', function () {
            it('should expose a .callback() function', function (passed) {
                Should(console).have.property('callback');
                Should(console.callback).be.a.Function;
                passed();
            });

            it('should properly define constants', function (passed) {
                Should(console).have.property('constants');
                passed();
            });

            // trying to assert that I didn't totally fuckup the original console by magic
            it('should prototype similarly to the original `console` without breaking it', function (passed) {
                console.__proto__.should.eql(originalConsole.__proto__);
                console.should.have.property('log').Function.eql(originalConsole.log);
                console.should.have.property('info').Function.eql(originalConsole.info);
                console.should.have.property('warn').Function.eql(originalConsole.warn);
                console.should.have.property('error').Function.eql(originalConsole.error);
                console.should.have.property('dir').Function.eql(originalConsole.dir);
                console.should.have.property('time').Function.eql(originalConsole.time);
                console.should.have.property('timeEnd').Function.eql(originalConsole.timeEnd);
                console.should.have.property('trace').Function.eql(originalConsole.trace);
                console.should.have.property('assert').Function.eql(originalConsole.assert);
                passed();
            });
        });

        describe('Standard API & Output Behavior', function () {
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
                unhook_stdout = hook_stream(process.stdout, function(string, encoding, fd) {
                    logs.push(string);
                });
            });

            it('should fire with the defaults', function (passed) {
                var cb = console.callback();

                cb();
                logs = trim_newline(logs);

                // well this is super tedious feeling
                logs.should.have.a.length(5);
                logs[0].should.eql(console.constants.DELIMETER);
                logs[1].should.eql(console.constants.MESSAGE);
                logs[2].should.eql(console.constants.SHOW_ARGS_MESSAGE);
                logs[3].should.eql('');
                logs[4].should.eql(console.constants.DELIMETER);

                unhook_stdout();
                passed();
            });

            it('should log arguments passed to the callback', function (passed) {
                var args        = { key: 'value' },
                    cb          = console.callback(true),
                    argsOutput;

                cb(args);
                logs        = trim_newline(logs);
                argsOutput  = eval('(' + logs[3] + ')');

                logs.should.have.a.length(5);
                argsOutput.should.eql(args);

                unhook_stdout();
                passed();
            });

            it('should not log arguments when turned off', function (passed) {
                var args        = { key: 'value' },
                    cb          = console.callback(false);

                cb(args);

                logs.should.have.length(3);
                unhook_stdout();
                passed();
            });

            it('should log a given simple message', function (passed) {
                var message         = 'Well then, I see.',
                    cb              = console.callback(false, message);

                cb('lolz');

                logs = trim_newline(logs);
                logs.should.have.a.length(3);
                logs[1].should.eql(message);

                unhook_stdout();
                passed();
            });

            it('should log a given complex message', function (passed) {
                var message         = 'Well then, I see, %s @ %s',
                    name            = 'Stephen',
                    date            = new Date(),
                    cb              = console.callback(false, message, name, date);

                cb('lolz');

                logs = trim_newline(logs);
                logs.should.have.a.length(3);
                logs[1].should.eql(Util.format(message, name, date));

                unhook_stdout();
                passed();
            });
        });

    });
});
