/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["mithril"], function(m) {
      return (root.headerView = factory(m));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.headerView = factory(require("mithril")));
  }
  else {
    root.headerView = factory(root.m);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(m) {
    return function(model, actions) {
      return m("header.header", [
        m("h1", "todos"),
        m("input.new-todo", {placeholder: "What needs to be done?", autoFocus: true,
          value: model.newTodo, onkeyup: actions.events.onNewTodoKeyUp})
      ]);
    };
  }
));
