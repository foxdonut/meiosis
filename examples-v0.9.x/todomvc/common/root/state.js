/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return (root.todoState = factory());
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoState = factory());
  }
  else {
    root.todoState = factory();
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function() {
    var allCompleted = function(filteredTodos) {
      var result = true;

      for (var i = 0, t = filteredTodos.length; i < t; i++) {
        if (!filteredTodos[i].completed) {
          result = false;
          break;
        }
      }
      return result;
    };

    return function(model) {
      var state = Object.assign({}, model);
      var by = model.filter;
      var completed = by === "completed";

      var filterBy = (by && by !== "all") ? function(todo) {
        return (!!todo.completed) === completed;
      } :
      function() {
        return true;
      };
      state.filteredTodos = model.todos.filter(filterBy);
      state.allCompleted = allCompleted(state.filteredTodos);

      var notCompleted = function(todo) { return !todo.completed; };
      var itemsLeft = state.filteredTodos.filter(notCompleted).length;
      state.itemsLeftText = state.filteredTodos.length > 0 ?
        (String(itemsLeft) + " item" + (itemsLeft === 1 ? "" : "s") + " left") : "";
      state.clearCompleted = (state.filteredTodos.length - itemsLeft) > 0;

      state.allSelected = model.filter === "all";
      state.activeSelected = model.filter === "active";
      state.completedSelected = model.filter === "completed";

      return state;
    };
  }
));
