/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./actionTypes"], function(footerActionTypes) {
      return (root.footerActions = factory(footerActionTypes));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.footerActions = factory(require("./actionTypes")));
  }
  else {
    root.footerActions = factory(root.footerActionTypes);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(FooterAction) {
    return function(propose) {
      var actions = {
        clearCompleted: function() {
          propose(FooterAction.ClearCompleted());
        },
        filter: function(by) {
          propose(FooterAction.Filter(by));
        }
      };

      actions.events = {
        onClearCompleted: function(_evt) {
          actions.clearCompleted();
        }
      };

      return actions;
    };
  }
));
