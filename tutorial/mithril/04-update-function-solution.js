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
      m("button", { onclick: increase( 1) }, m.trust("&times;"), " 1"),
      m("button", { onclick: increase(-1) }, m.trust("&times;"), " -1"),
      /* Add two buttons which multiply by 5 / -5 */
      m("button", { onclick: increase( 5) }, m.trust("&times;"), " 5"),
      m("button", { onclick: increase(-5) }, m.trust("&times;"), " -5")
    ];
  };
  return view;
};

// -- Meiosis pattern setup code

// Change the initial value of the model to 1
var model = 1;
var element = document.getElementById("app");
var view = null;

// Change how the model gets updated, by multiplying instead of adding
var update = function(value) {
  model = model * value;
  m.render(element, view(model));
};

view = createView(update);
m.render(element, view(model));
