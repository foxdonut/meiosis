/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "./actionTypes"], function(meiosis, todoEditActionTypes) {
      return (root.todoEditReceive = factory(meiosis, todoEditActionTypes));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoEditReceive = factory(require("meiosis"), require("./actionTypes")));
  }
  else {
    root.todoEditReceive = factory(root.meiosis, root.todoEditActionTypes);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, EditAction) {
    return function(todoStorage) {
      return function(model, proposal) {
        EditAction.case({
          EditingTodo: function(todo) {
            model.editTodo = todo;
          },
          SaveTodo: function(todo) {
            var editing = todo.id === model.editTodo.id;
            todo.title = todo.title.trim();

            if (editing && todo.title) {
              model.todos = todoStorage.saveTodo(todo);
              model.editTodo = { };
            }
            else {
              return meiosis.REFUSE_PROPOSAL;
            }
          },
          ClearEdit: function() {
            model.editTodo = { };
          }
        }, proposal);

        return model;
      };
    };
  }
));
