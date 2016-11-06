/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "meiosis-tracer", "union-type", "./root/component", "../common/store"], function(meiosis, meiosisTracer, Type, rootComponent, todoStorage) {
      return (root.runapp = factory(meiosis, meiosisTracer, Type, rootComponent, todoStorage));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.runapp = factory(require("meiosis"), require("meiosis-tracer"), require("union-type"), require("./root/component"), require("../common/store")));
  }
  else {
    root.runapp = factory(root.meiosis, root.meiosisTracer, root.unionType, root.rootComponent, root.todoStorage);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, meiosisTracer, Type, rootComponent, todoStorage) {
    return function(meiosisRender) {
      Type.check = false;

      var root = rootComponent(todoStorage);
      var renderRoot = meiosis.run({ renderer: meiosisRender.renderer().intoId(document, "app"), rootComponent: root });
      meiosisTracer(meiosis.createComponent, renderRoot, "#tracer");
    };
  }
));
