/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["classnames"], function(classnames) {
      return (root.footerView = factory(classnames));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.footerView = factory(require("classnames")));
  }
  else {
    root.footerView = factory(root.classNames);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(classnames) {
    return function(model) {
      var clearCompleted = model.clearCompleted ?
        "<button class='clear-completed'>Clear completed</button>" : "";

      return "<footer class='footer'>" +
        "<span class='todo-count'>" + model.itemsLeftText + "</span>" +
        "<ul class='filters'>" +
        "<li><a href='#/' class='" + classnames({selected: model.allSelected}) + "'>All</a></li>" +
        "<li><a href='#/active' class='" + classnames({selected: model.activeSelected}) + "'>Active</a></li>" +
        "<li><a href='#/completed' class='" + classnames({selected: model.completedSelected}) + "'>Completed</a></li>" +
        "</ul>" +
        clearCompleted +
        "</footer>";
    };
  }
));
