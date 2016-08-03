/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["meiosis-snabbdom"], function(meiosisSnabbdom) {
      return (root.todoItemView = factory(meiosisSnabbdom));
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoItemView = factory(require("meiosis-snabbdom")));
  }
  else {
    root.todoItemView = factory(root.meiosisSnabbdom);
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function(meiosisSnabbdom) {
    return function(todoEditComponent) {
      return function(model, actions) {
        var h = meiosisSnabbdom.renderer.h;

        var todo = model.todo;
        var events = actions.events;

        return h("li", {attrs: {class: model.todoClasses}}, [
          h("div.view", [
            h("input.toggle", {props: {type: "checkbox", checked: todo.completed},
              on: {change: events.onToggleTodo(todo.id)}}),
            h("label", {on: {dblclick: events.onEditTodo(todo)}}, todo.title),
            h("button.destroy", {on: {click: events.onDestroyTodo(todo.id)}})
          ]),
          todoEditComponent(model)
        ]);
      };
    };
  }
));
