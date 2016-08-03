/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery", "handlebars"], function($, Handlebars) {
      return (root.todoItemView = factory(jQuery, Handlebars));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoItemView = factory(require("jquery"), require("handlebars")));
  }
  else {
    root.todoItemView = factory(root.jQuery, root.Handlebars);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function($, Handlebars) {
    var todoItemTemplate = Handlebars.compile($("#todoItem").html());

    return function(todoEditComponent) {
      return function(model) {
        return todoItemTemplate({model: model, input: todoEditComponent(model)});
      };
    };
  }
));
