/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./actionTypes"], function(mainActionTypes) {
      return (root.mainReceive = factory(mainActionTypes));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.mainReceive = factory(require("./actionTypes")));
  }
  else {
    root.mainReceive = factory(root.mainActionTypes);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(MainAction) {
    return function(todoStorage) {
      return function(model, proposal) {
        MainAction.case({
          SetAllCompleted: function(completed) {
            model.todos = todoStorage.setAllCompleted(completed);
          }
        }, proposal);

        return model;
      };
    };
  }
));
