/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis-react", "./runapp.jsx"], function(meiosisReact, runapp) {
      return (root.reactApp = factory(meiosisReact, runapp));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.reactApp = factory(require("meiosis-react"), require("./runapp.jsx")));
  }
  else {
    root.reactApp = factory(root.meiosisReact, root.runapp);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosisReact, runapp) {
    runapp(meiosisReact);
  }
));
