/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "../../common/footer/actions", "./view", "../../common/footer/receive", "../../common/footer/ready"], function(meiosis, footerActions, footerView, footerReceive, footerReady) {
      return (root.footerComponent = factory(meiosis, footerActions, footerView, footerReceive, footerReady));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.footerComponent = factory(require("meiosis"), require("../../common/footer/actions"), require("./view"), require("../../common/footer/receive"), require("../../common/footer/ready")));
  }
  else {
    root.footerComponent = factory(root.meiosis, root.footerActions, root.footerView, root.footerReceive, root.footerReady);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, footerActions, footerView, footerReceive, footerReady) {
    return function(todoStorage) {
      return meiosis.createComponent({
        actions: footerActions,
        view: footerView,
        receive: footerReceive(todoStorage),
        ready: footerReady
      });
    };
  }
));
