/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./actionTypes"], function(headerActionTypes) {
      return (root.headerActions = factory(headerActionTypes));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.headerActions = factory(require("./actionTypes")));
  }
  else {
    root.headerActions = factory(root.headerActionTypes);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(HeaderAction) {
    return function(propose) {
      var actions = {
        newTodo: function(title) {
          propose(HeaderAction.NewTodo(title));
        },
        saveTodo: function(title) {
          propose(HeaderAction.SaveNewTodo(title));
        },
        clearNewTodo: function() {
          propose(HeaderAction.ClearNewTodo());
        }
      };

      var ENTER_KEY = 13;

      actions.events = {
        onNewTodoKeyUp: function(evt) {
          if (evt.keyCode === ENTER_KEY) {
            actions.saveTodo(evt.target.value);
          }
          else {
            actions.newTodo(evt.target.value);
          }
        },
        onNewTodoKeyUpEnterOnly: function(evt) {
          if (evt.keyCode === ENTER_KEY || evt.which === ENTER_KEY) {
            actions.saveTodo(evt.target.value);
          }
        },
        onNewTodoChange: function(evt) {
          actions.newTodo(evt.target.value);
        }
      };

      return actions;
    };
  }
));
