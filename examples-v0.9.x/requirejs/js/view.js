/*global define*/
define([], function() {
  return function(model) {
    return "<div><span>Counter: " + model.counter + "</span></div>" +
      "<div><button id='inc'>+</button> <button id='decr'>-</button></div>";
  };
});
