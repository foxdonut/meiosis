/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "../../common/main/actions", "../../common/main/receive", "./view", "./ready", "../todoItem/component"], function(meiosis, mainActions, mainReceive, mainView, mainReady, todoItemComponent) {
      return (root.mainComponent = factory(meiosis, mainActions, mainReceive, mainView, mainReady, todoItemComponent));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.mainComponent = factory(require("meiosis"), require("../../common/main/actions"), require("../../common/main/receive"), require("./view"), require("./ready"), require("../todoItem/component")));
  }
  else {
    root.mainComponent = factory(root.meiosis, root.mainActions, root.mainReceive, root.mainView, root.mainReady, root.todoItemComponent);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, mainActions, mainReceive, mainView, mainReady, todoItemComponent) {
    return function(todoStorage) {
      var todoItem = todoItemComponent(todoStorage);

      return meiosis.createComponent({
        actions: mainActions,
        view: mainView(todoItem),
        receive: mainReceive(todoStorage),
        ready: mainReady // only jquery and vanillajs need ready
      });
    };
  }
));
