/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["union-type"], function(Type) {
      return (root.todoItemActionTypes = factory(Type));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoItemActionTypes = factory(require("union-type")));
  }
  else {
    root.todoItemActionTypes = factory(root.unionType);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(Type) {
    return Type({
      SetCompleted: [ Number, Boolean ],
      EditTodo: [ Object ],
      DeleteTodo: [ Number ]
    });
  }
));
