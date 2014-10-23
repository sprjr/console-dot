  function ConsoleDot() {
    if (!(this instanceof ConsoleDot)) {
      return new ConsoleDot();
    }
  }
  ;
  ConsoleDot.__proto__ = console.__proto__;
  ConsoleDot.__proto__.callback = function consoleCallback() {
    var showArgs = arguments[0] !== (void 0) ? arguments[0] : true;
    for (var logMessage = [],
        $__0 = 1; $__0 < arguments.length; $__0++)
      logMessage[$__0 - 1] = arguments[$__0];
    var self = this;
    return function logCallback() {
      this.log.apply(self, logMessage);
      if (showArgs)
        this.log.apply(arguments);
    };
  };
  if (typeof module !== 'undefined' && "exports" in module) {
    module.exports = ConsoleDot;
  }
