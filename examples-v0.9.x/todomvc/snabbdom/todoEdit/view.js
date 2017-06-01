/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis-snabbdom"], function(meiosisSnabbdom) {
      return (root.todoEditView = factory(meiosisSnabbdom));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoEditView = factory(require("meiosis-snabbdom")));
  }
  else {
    root.todoEditView = factory(root.meiosisSnabbdom);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosisSnabbdom) {
    var h = meiosisSnabbdom.renderer.h;

    return {
      todoEdit: function(todo, actions) {
        var events = actions.events;

        return h("input.edit", {
          props: { type: "text", value: todo.title },
          on: {
            keyup: events.onEditKeyUp(todo.id),
            blur: events.onEditBlur(todo.id)
          },
          hook: {
            insert: function(vnode) {
              var element = vnode.elm;
              element.focus();
              element.selectionStart = element.value.length;
            }
          }
        });
      },

      noTodoInput: function() {
        return h("span");
      }
    };
  }
));
