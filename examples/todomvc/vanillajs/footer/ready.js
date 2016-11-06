/*global define, exports, module, require, document*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["history", "meiosis-vanillajs"], function(History, meiosisVanillaJs) {
      return (root.footerReady = factory(History, meiosisVanillaJs));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.footerReady = factory(require("history"), require("meiosis-vanillajs")));
  }
  else {
    root.footerReady = factory(root.History, root.meiosisVanillaJs);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(History, meiosisVanillaJs) {
    var renderer = meiosisVanillaJs.renderer();
    var root = document.getElementById("app");

    return function(actions) {
      var history = History.createBrowserHistory();

      history.listen(function(location) {
        var route = location.hash.split("/")[1] || "all";
        actions.filter(route);
      });

      renderer.delegate(root, "button.clear-completed", "click", function() {
        actions.clearCompleted();
      });
    };
  }
));
