/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis-snabbdom"], function(meiosisSnabbdom) {
      return (root.footerView = factory(meiosisSnabbdom));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.footerView = factory(require("meiosis-snabbdom")));
  }
  else {
    root.footerView = factory(root.meiosisSnabbdom);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosisSnabbdom) {
    return function(model, actions) {
      var h = meiosisSnabbdom.renderer.h;

      var clearCompleted = model.clearCompleted ?
        h("button.clear-completed", {on: {click: actions.events.onClearCompleted}}, "Clear completed") : h("span");

      return h("footer.footer", [
        h("span.todo-count", model.itemsLeftText),
        h("ul.filters", [
          h("li", [h("a", {props: {href: "#/"}, class: {selected: model.allSelected}}, "All")]),
          h("li", [h("a", {props: {href: "#/active"}, class: {selected: model.activeSelected}}, "Active")]),
          h("li", [h("a", {props: {href: "#/completed"}, class: {selected: model.completedSelected}}, "Completed")])
        ]),
        clearCompleted
      ]);
    };
  }
));
