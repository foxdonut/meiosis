/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "../../common/root/model", "../../common/root/state", "./view", "../todoapp/component"], function(meiosis, todoModel, todoState, rootView, todoappComponent) {
      return (root.todoappComponent = factory(meiosis, todoModel, todoState, rootView, todoappComponent));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.rootComponent = factory(require("meiosis"), require("../../common/root/model"), require("../../common/root/state"), require("./view"), require("../todoapp/component")));
  }
  else {
    root.rootComponent = factory(root.meiosis, root.todoModel, root.todoState, root.rootView, root.todoappComponent);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, todoModel, todoState, rootView, todoappComponent) {
    return function(todoStorage) {
      var todoapp = todoappComponent(todoStorage);

      return meiosis.createComponent({
        initialModel: function() { return todoModel(todoStorage); },
        state: todoState,
        view: rootView(todoapp)
      });
    };
  }
));
