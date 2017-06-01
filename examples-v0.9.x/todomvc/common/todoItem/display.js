/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["classnames"], function(classnames) {
      return (root.todoItemDisplay = factory(classnames));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoItemDisplay = factory(require("classnames")));
  }
  else {
    root.todoItemDisplay = factory(root.classNames);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(classnames) {
    var getTodoClasses = function(state, model, todo) {
      return classnames({
        "completed": todo.completed,
        "editing": state.editing(model, todo)
      });
    };

    return function(state, view) {
      return function(model, actions) {
        return function(todo) {
          var todoClasses = getTodoClasses(state, model, todo);
          return view({model: model, todo: todo, todoClasses: todoClasses}, actions);
        };
      };
    };
  }
));
