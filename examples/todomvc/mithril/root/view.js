/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["mithril"], function(m) {
      return (root.iew = factory(m));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.rootView = factory(require("mithril")));
  }
  else {
    root.rootView = factory(root.m);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(m) {
    var info = m("footer.info", [
      m("p", "Double-click to edit a todo"),
      m("p", [m("span", "Meiosis - Mithril - Created by "), m("a", {href: "http://twitter.com/foxdonut00"}, "foxdonut00")]),
      m("p", [m("span", "Part of "), m("a", {href: "http://todomvc.com"}, "TodoMVC")])
    ]);

    return function(todoapp) {
      return function(model) {
        return m("div", [todoapp(model), info]);
      };
    };
  }
));
