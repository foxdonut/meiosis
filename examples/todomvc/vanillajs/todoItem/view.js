/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return (root.todoItemView = factory());
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoItemView = factory());
  }
  else {
    root.todoItemView = factory();
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function() {
    return function(todoEditComponent) {
      return function(model) {
        var todo = model.todo;

        var dataId = " data-id='" + todo.id + "'";
        var checked = todo.completed ? " checked" : "";

        return "<li class='" + model.todoClasses + " '>" +
          "<div class='view'>" +
          "<input" + dataId + " class='toggle' type='checkbox'" + checked + ">" +
          "<label" + dataId + ">" + todo.title + "</label>" +
          "<button" + dataId + " class='destroy'></button>" +
          "</div>" +
          todoEditComponent(model) +
          "</li>";
      };
    };
  }
));
