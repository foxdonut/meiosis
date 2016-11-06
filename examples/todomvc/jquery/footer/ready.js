/*global define, exports, module, require, document*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["history", "jquery"], function(History, $) {
      return (root.footerReady = factory(History, $));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.footerReady = factory(require("history", require("jquery"))));
  }
  else {
    root.footerReady = factory(root.History, root.jQuery);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(History, $) {
    var $root = $(document.getElementById("app"));

    return function(actions) {
      var history = History.createBrowserHistory();

      history.listen(function(location) {
        var route = location.hash.split("/")[1] || "all";
        actions.filter(route);
      });

      $root.on("click", "button.clear-completed", function() {
        actions.clearCompleted();
      });
    };
  }
));
