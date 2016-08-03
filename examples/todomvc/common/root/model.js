/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return (root.todoModel = factory());
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoModel = factory());
  }
  else {
    root.todoModel = factory();
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function() {
    return function(todoStorage) {
      return {
        todos: todoStorage.loadAll(),
        newTodo: "",
        editTodo: {},
        filter: "all"
      };
    };
  }
));
