/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["mithril"], function(m) {
      return (root.todoEditView = factory(m));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoEditView = factory(require("mithril")));
  }
  else {
    root.todoEditView = factory(root.m);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(m) {
    return {
      todoEdit: function(todo, actions) {
        var events = actions.events;

        return m("input.edit[type=text]", {
          value: todo.title,
          onkeyup: events.onEditKeyUp(todo.id),
          onblur: events.onEditBlur(todo.id),
          config: function(element) {
            element.focus();
            element.selectionStart = element.value.length;
          }
        });
      },

      noTodoInput: function() {
        return m("span");
      }
    };
  }
));
