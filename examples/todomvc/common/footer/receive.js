/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "./actionTypes"], function(meiosis, footerActionTypes) {
      return (root.footerReceive = factory(meiosis, footerActionTypes));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.footerReceive = factory(require("meiosis"), require("./actionTypes")));
  }
  else {
    root.footerReceive = factory(root.meiosis, root.footerActionTypes);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, FooterAction) {
    return function(todoStorage) {
      return function(model, proposal) {
        FooterAction.case({
          ClearCompleted: function() {
            model.todos = todoStorage.clearCompleted();
          },
          Filter: function(by) {
            if (by === model.filter) {
              return meiosis.REFUSE_PROPOSAL;
            }
            model.todos = todoStorage.loadAll();
            model.filter = by;
          }
        }, proposal);

        return model;
      };
    };
  }
));
