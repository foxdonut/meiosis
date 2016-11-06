/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "./view", "../header/component", "../main/component", "../footer/component"], function(meiosis, todoappView, headerComponent, mainComponent, footerComponent) {
      return (root.todoappComponent = factory(meiosis, todoappView, headerComponent, mainComponent, footerComponent));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoappComponent = factory(require("meiosis"), require("./view"), require("../header/component"), require("../main/component"), require("../footer/component")));
  }
  else {
    root.todoappComponent = factory(root.meiosis, root.todoappView, root.headerComponent, root.mainComponent, root.footerComponent);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, todoappView, headerComponent, mainComponent, footerComponent) {
    return function(todoStorage) {
      var header = headerComponent(todoStorage);
      var main = mainComponent(todoStorage);
      var footer = footerComponent(todoStorage);

      var view = todoappView(header, main, footer);

      return meiosis.createComponent({ view: view });
    };
  }
));
