/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery", "handlebars"], function($, Handlebars) {
      return (root.todoappView = factory(jQuery, Handlebars));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoappView = factory(require("jquery"), require("handlebars")));
  }
  else {
    root.todoappView = factory(root.jQuery, root.Handlebars);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function($, Handlebars) {
    var todoappTemplate = Handlebars.compile($("#todoapp").html());

    return function(header, main, footer) {
      return function(model) {
        return todoappTemplate({
          header: header(model),
          main: main(model),
          footer: footer(model)
        });
      };
    };
  }
));
