/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["history"], function(History) {
      return (root.footerReady = factory(History));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.footerReady = factory(require("history")));
  }
  else {
    if (!root.footerReady) {
      root.footerReady = factory(root.History);
    }
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(History) {
    return function(actions) {
      var history = History.createBrowserHistory();

      history.listen(function(location) {
        var route = location.hash.split("/")[1] || "all";
        actions.filter(route);
      });
    };
  }
));
