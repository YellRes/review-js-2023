(function () {
  var root = this;

  var SymbolPolyfill = function Symbol(description) {
    if (this instanceof SymbolPolyfill)
      throw new TypeError("Symbol is not a constructor");

    var descString =
      description === undefined ? undefined : String(description);

    var symbol = Object.create(null);
    Object.defineProperty(symbol, {
      __Description__: {
        value: descString,
        writable: false,
        enumerable: false,
        configurable: false,
      },
    });

    return symbol;
  };

  root.SymbolPolyfill = SymbolPolyfill;
})();
