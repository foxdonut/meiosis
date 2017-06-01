/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis-snabbdom", "./runapp"], function(meiosisSnabbdom, runapp) {
      return (root.snabbdomApp = factory(meiosisSnabbdom, runapp));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.snabbdomApp = factory(require("meiosis-snabbdom"), require("./runapp")));
  }
  else {
    root.snabbdomApp = factory(root.meiosisSnabbdom, root.runapp);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosisSnabbdom, runapp) {
    runapp(meiosisSnabbdom);
  }
));
