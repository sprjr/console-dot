
function ConsoleDot () {
    if (!(this instanceof ConsoleDot)) {
        return new ConsoleDot();
    }
};

ConsoleDot.__proto__ = console.__proto__;

// Provides a callback style curry function that accepts `showArgs` and `...logMessage`
// `showArgs` can be any truthy/falsy value, and if truthy will additionally output
// any arguments passed to the callback we are placeholding (e.g. function (err, arg1))
// `...logMessage` can be any normal log string (e.g. 'hello' or "'hello %s', 'stephen'")
// defaults: { showArgs: true, logMessage: 'callback fired'}
ConsoleDot.__proto__.callback = function consoleCallback(showArgs = true, message = 'callback fired', ...logMessages) {
    var self = this;

    logMessages.unshift(message);

    return function logCallback() {
        self.log.apply(self, logMessages);

        if (showArgs) self.log.apply(self, arguments);
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
