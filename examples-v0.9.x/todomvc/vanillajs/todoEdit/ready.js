/*global define, exports, module, require, document*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis-vanillajs"], function(meiosisVanillaJs) {
      return (root.todoEditReady = factory(meiosisVanillaJs));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoEditReady = factory(require("meiosis-vanillajs")));
  }
  else {
    root.todoEditReady = factory(root.meiosisVanillaJs);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosisVanillaJs) {
    var renderer = meiosisVanillaJs.renderer();
    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;
    var root = document.getElementById("app");

    return function(actions) {
      renderer.delegate(root, "input.edit", "keyup", function(evt) {
        var todoId = parseInt(evt.target.dataset.id, 10);

        if (evt.keyCode === ESCAPE_KEY) {
          actions.clearEdit(todoId);
        }
        else if (evt.keyCode === ENTER_KEY) {
          actions.saveTodo(evt.target.value, todoId);
        }
      });

      renderer.delegate(root, "input.edit", "blur", function(evt) {
        var todoId = parseInt(evt.target.dataset.id, 10);
        actions.saveTodo(evt.target.value, todoId);
      });
    };
  }
));
