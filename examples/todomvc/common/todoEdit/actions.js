/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./actionTypes"], function(todoEditActionTypes) {
      return (root.todoEditActions = factory(todoEditActionTypes));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoEditActions = factory(require("./actionTypes")));
  }
  else {
    root.todoEditActions = factory(root.todoEditActionTypes);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(EditAction) {
    return function(propose) {
      var actions = {
        editingTodo: function(title, id) {
          propose(EditAction.EditingTodo({ title: title, id: id }));
        },
        saveTodo: function(title, id) {
          propose(EditAction.SaveTodo({ title: title, id: id }));
        },
        clearEdit: function() {
          propose(EditAction.ClearEdit());
        }
      };

      var ENTER_KEY = 13;
      var ESCAPE_KEY = 27;

      actions.events = {
        onEditKeyUp: function(todoId) {
          return function(evt) {
            if (evt.keyCode === ESCAPE_KEY || evt.which === ESCAPE_KEY) {
              actions.clearEdit();
            }
            else if (evt.keyCode === ENTER_KEY || evt.which === ENTER_KEY) {
              actions.saveTodo(evt.target.value, todoId);
            }
          };
        },
        onEditChange: function(todoId) {
          return function(evt) {
            actions.editingTodo(evt.target.value, todoId);
          };
        },
        onEditBlur: function(todoId) {
          return function(evt) {
            actions.saveTodo(evt.target.value, todoId);
          };
        }
      };

      return actions;
    };
  }
));
