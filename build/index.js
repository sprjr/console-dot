"use strict";
var __moduleName = "lib_index";
function ConsoleDot() {
  var delimeter = arguments[0] !== (void 0) ? arguments[0] : 'console.callback --------';
  var message = arguments[1] !== (void 0) ? arguments[1] : 'callback fired';
  var showArgsMessage = arguments[2] !== (void 0) ? arguments[2] : 'showing arguments received --------';
  if (!(this instanceof ConsoleDot)) {
    return new ConsoleDot(delimeter, message, showArgsMessage);
  }
  ConsoleDot.prototype.initialize(delimeter, message, showArgsMessage);
}
;
ConsoleDot.__proto__ = console.__proto__;
ConsoleDot.prototype.initialize = function(delimeter, message, showArgsMessage) {
  ConsoleDot.__proto__.constants = Object.freeze({
    DELIMETER: delimeter,
    MESSAGE: message,
    SHOW_ARGS_MESSAGE: showArgsMessage
  });
};
ConsoleDot.__proto__.callback = function consoleCallback() {
  var showArgs = arguments[0] !== (void 0) ? arguments[0] : true;
  var message = arguments[1] !== (void 0) ? arguments[1] : this.constants.MESSAGE;
  for (var logMessages = [],
      $__0 = 2; $__0 < arguments.length; $__0++)
    logMessages[$__0 - 2] = arguments[$__0];
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
  };
};
if (typeof module !== 'undefined' && "exports" in module) {
  module.exports = ConsoleDot;
}
