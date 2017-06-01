/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis", "../../common/todoEdit/actions", "./view.jsx", "../../common/todoEdit/display", "../../common/todoEdit/receive", "../../common/todoItem/state"], function(meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoItemState) {
      return (root.todoEditComponent = factory(meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoItemState));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoEditComponent = factory(require("meiosis"), require("../../common/todoEdit/actions"), require("./view.jsx"), require("../../common/todoEdit/display"), require("../../common/todoEdit/receive"), require("../../common/todoItem/state")));
  }
  else {
    root.todoEditComponent = factory(root.meiosis, root.todoEditActions, root.todoEditView, root.todoEditDisplay, root.todoEditReceive, root.todoItemState);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosis, todoEditActions, todoEditView, todoEditDisplay, todoEditReceive, todoItemState) {
    return function(todoStorage) {
      return meiosis.createComponent({
        actions: todoEditActions,
        view: todoEditDisplay(todoItemState, todoEditView),
        receive: todoEditReceive(todoStorage)
      });
    };
  }
));
