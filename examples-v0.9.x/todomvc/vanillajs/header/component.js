/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "../../common/header/actions", "../../common/header/receive", "./view", "./ready"], function(meiosis, headerActions, headerReceive, headerView, headerReady) {
      return (root.headerComponent = factory(meiosis, headerActions, headerReceive, headerView, headerReady));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.headerComponent = factory(require("meiosis"), require("../../common/header/actions"), require("../../common/header/receive"), require("./view"), require("./ready")));
  }
  else {
    root.headerComponent = factory(root.meiosis, root.headerActions, root.headerReceive, root.headerView, root.headerReady);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, headerActions, headerReceive, headerView, headerReady) {
    return function(todoStorage) {
      return meiosis.createComponent({
        actions: headerActions,
        view: headerView,
        receive: headerReceive(todoStorage),
        ready: headerReady // only jquery and vanillajs need ready
      });
    };
  }
));
