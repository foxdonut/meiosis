/*global define, exports, module, require*/

// This boilerplate is to support running this code with either, just the browser, or RequireJS,
// or node.js / npm (browserify, webpack, etc.) Do not think this boilerplate is necessary to run
// Meiosis. It is for convenience to be able to run the example with your preferred module system.
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return (root.todoStorage = factory());
    });
  }
  else if (typeof module === "object" && module.exports) {
    module.exports = (root.todoStorage = factory());
  }
  else {
    root.todoStorage = factory();
  }
}(this || window, // ^^ the code above is boilerplate. the "real" code starts below. vv

  function() {
    var STORAGE_KEY = "meiosis-todomvc";

    var findIndex = function(todos, todoId) {
      var index = -1;

      for (var i = 0, t = todos.length; i < t; i++) {
        if (todos[i].id === todoId) {
          index = i;
          break;
        }
      }
      return index;
    };

    var replaceTodoAtIndex = function(todos, todo, index) {
      return todos.slice(0, index).concat([todo]).concat(todos.slice(index + 1));
    };

    var deleteTodoAtIndex = function(todos, index) {
      return todos.slice(0, index).concat(todos.slice(index + 1));
    };

    var todoStorage = {
      loadAll: function() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      },
      saveAll: function(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        return todos;
      },
      saveTodo: function(todo) {
        var todos = this.loadAll();
        var id = parseInt(todo.id, 10);

        if (id > 0) {
          var index = findIndex(todos, id);
          todo.completed = todos[index].completed;
          todos = replaceTodoAtIndex(todos, todo, index);
        }
        else {
          todos = todos.concat([{title: todo.title, id: new Date().getTime(), completed: false}]);
        }
        return this.saveAll(todos);
      },
      deleteTodoId: function(todoId) {
        var todos = this.loadAll();
        var index = findIndex(todos, todoId);

        if (index >= 0) {
          todos = deleteTodoAtIndex(todos, index);
          this.saveAll(todos);
        }
        return todos;
      },
      setCompleted: function(id, completed) {
        var todos = this.loadAll();
        var index = findIndex(todos, id);

        if (index >= 0) {
          var todo = todos[index];
          todo.completed = completed;
          todos = replaceTodoAtIndex(todos, todo, index);
          this.saveAll(todos);
        }
        return todos;
      },
      setAllCompleted: function(completed) {
        var todos = this.loadAll();
        todos.forEach(function(todo) {
          todo.completed = completed;
        });
        this.saveAll(todos);
        return todos;
      },
      clearCompleted: function() {
        var todos = this.loadAll();
        var updatedTodos = [];

        for (var i = 0, t = todos.length; i < t; i++) {
          if (!todos[i].completed) {
            updatedTodos.push(todos[i]);
          }
        }
        return this.saveAll(updatedTodos);
      }
    };

    return todoStorage;
  }
));
