/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["mithril"], function(m) {
      return (root.todoItemView = factory(m));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoItemView = factory(require("mithril")));
  }
  else {
    root.todoItemView = factory(root.m);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(m) {
    return function(todoEditComponent) {
      return function(model, actions) {
        var todo = model.todo;
        var events = actions.events;

        return m("li", {class: model.todoClasses}, [
          m("div.view", [
            m("input.toggle[type=checkbox]", {checked: todo.completed,
              onchange: events.onToggleTodo(todo.id)}),
            m("label", {ondblclick: events.onEditTodo(todo)}, todo.title),
            m("button.destroy", {onclick: events.onDestroyTodo(todo.id)})
          ]),
          todoEditComponent(model)
        ]);
      };
    };
  }
));
