/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return (root.mainState = factory());
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.mainState = factory());
  }
  else {
    root.mainState = factory();
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function() {
    return {
      allCompleted: function(model) {
        var result = true;

        for (var i = 0, t = model.filteredTodos.length; i < t; i++) {
          if (!model.filteredTodos[i].completed) {
            result = false;
            break;
          }
        }
        return result;
      }
    };
  }
));
