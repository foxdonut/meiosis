/*global m*/

// -- Application code

var createView = function(update) {
  var increase = function(amount) {
    return function(_event) {
      update(amount);
    };
  };
  var view = function(model) {
    return [
      m("div", "Counter: " + model),
      m("button", { onclick: increase( 1) }, "+1"),
      m("button", { onclick: increase(-1) }, "-1")
    ];
  };
  return view;
};

// -- Meiosis pattern setup code

var model = 0;
var element = document.getElementById("app");
var view = null;

var update = function(value) {
  model = model + value;
  m.render(element, view(model));
};

view = createView(update);
m.render(element, view(model));
