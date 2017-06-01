/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return (root.rootView = factory());
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.rootView = factory());
  }
  else {
    root.rootView = factory();
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function() {
    var info = "<footer class='info'>" +
      "  <p>Double-click to edit a todo</p>" +
      "  <p>Meiosis - VanillaJs - Created by <a href='http://twitter.com/foxdonut00'>foxdonut00</a></p>" +
      "  <p>Part of <a href='http://todomvc.com'>TodoMVC</a></p>" +
      "</footer>";

    return function(todoapp) {
      return function(model) {
        return "<div>" + todoapp(model) + info + "</div>";
      };
    };
  }
));
