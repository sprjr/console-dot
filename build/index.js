"use strict";
var __moduleName = "lib_index";
function ConsoleDot() {
  if (!(this instanceof ConsoleDot)) {
    return new ConsoleDot();
  }
}
;
ConsoleDot.__proto__ = console.__proto__;
ConsoleDot.__proto__.callback = function consoleCallback() {
  var showArgs = arguments[0] !== (void 0) ? arguments[0] : true;
  var message = arguments[1] !== (void 0) ? arguments[1] : 'callback fired';
  for (var logMessages = [],
      $__0 = 2; $__0 < arguments.length; $__0++)
    logMessages[$__0 - 2] = arguments[$__0];
  var self = this;
  logMessages.unshift(message);
  return function logCallback() {
    self.log.apply(self, logMessages);
    if (showArgs)
      self.log.apply(self, arguments);
  };
};
if (typeof module !== 'undefined' && "exports" in module) {
  module.exports = ConsoleDot;
}
