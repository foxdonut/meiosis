/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./actionTypes"], function(todoItemActionTypes) {
      return (root.todoItemActions = factory(todoItemActionTypes));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoItemActions = factory(require("./actionTypes")));
  }
  else {
    root.todoItemActions = factory(root.todoItemActionTypes);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(ItemAction) {
    return function(propose) {
      var actions = {
        setCompleted: function(todoId, completed) {
          propose(ItemAction.SetCompleted(todoId, completed));
        },
        editTodo: function(todo) {
          propose(ItemAction.EditTodo(todo));
        },
        deleteTodoId: function(todoId) {
          propose(ItemAction.DeleteTodo(todoId));
        }
      };

      actions.events = {
        onToggleTodo: function(todoId) {
          return function(evt) {
            actions.setCompleted(todoId, evt.target.checked);
          };
        },
        onEditTodo: function(todo) {
          return function(_evt) {
            actions.editTodo(todo);
          };
        },
        onDestroyTodo: function(todoId) {
          return function(_evt) {
            actions.deleteTodoId(todoId);
          };
        }
      };

      return actions;
    };
  }
));
