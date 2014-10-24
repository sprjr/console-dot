
function ConsoleDot (delimeter = 'console.callback --------', message = 'callback fired', showArgsMessage = 'showing arguments received --------') {
    if (!(this instanceof ConsoleDot)) {
        return new ConsoleDot(delimeter, message, showArgsMessage);
    }

    ConsoleDot.prototype.initialize(delimeter, message, showArgsMessage);
};

ConsoleDot.__proto__ = console.__proto__;

// I have questions about this.
ConsoleDot.prototype.initialize = function (delimeter, message, showArgsMessage) {
    ConsoleDot.__proto__.constants = Object.freeze({
        DELIMETER:          delimeter,
        MESSAGE:            message,
        SHOW_ARGS_MESSAGE:  showArgsMessage
    });
};

// Provides a callback style curry function that accepts `showArgs` and `...logMessage`
// `showArgs` can be any truthy/falsy value, and if truthy will additionally output
// any arguments passed to the callback we are placeholding (e.g. function (err, arg1))
// `...logMessage` can be any normal log string (e.g. 'hello' or "'hello %s', 'stephen'")
// defaults: { showArgs: true, logMessage: 'callback fired'}
ConsoleDot.__proto__.callback = function consoleCallback(showArgs = true, message = this.constants.MESSAGE, ...logMessages) {
    var self = this;

    logMessages.unshift(message);

    return function logCallback() {
        self.log.call(self, self.constants.DELIMETER);
        self.log.apply(self, logMessages);

        if (showArgs) {
            self.log.call(self, self.constants.SHOW_ARGS_MESSAGE);
            self.log.apply(self, arguments);
        }

        self.log.call(self, self.constants.DELIMETER);
    }
};

// next version!
// ConsoleDot.__proto__.promise = function consolePromise() {
//     var args = Array.prototype.slice.call(arguments, 0);
//     var self = this;

//      return // a promise log fn here here
// };

// Hook into commonJS module systems
if (typeof module !== 'undefined' && "exports" in module) {
    module.exports = ConsoleDot;
}
