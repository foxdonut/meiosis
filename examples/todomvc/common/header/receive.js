/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "./actionTypes"], function(meiosis, headerActionTypes) {
      return (root.headerReceive = factory(meiosis, headerActionTypes));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.headerReceive = factory(require("meiosis"), require("./actionTypes")));
  }
  else {
    root.headerReceive = factory(root.meiosis, root.headerActionTypes);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, HeaderAction) {
    return function(todoStorage) {
      return function(model, proposal) {
        return HeaderAction.case({
          NewTodo: function(title) {
            model.newTodo = title;
            return model;
          },
          SaveNewTodo: function(title) {
            title = title.trim();

            if (title) {
              model.todos = todoStorage.saveTodo({title: title});
              model.newTodo = "";
              return model;
            }
            else {
              return meiosis.REFUSE_PROPOSAL;
            }
          },
          ClearNewTodo: function() {
            model.newTodo = "";
            return model;
          },
          _: function() {
            return model;
          }
        }, proposal);
      };
    };
  }
));
