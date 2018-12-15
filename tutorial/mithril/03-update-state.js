/*global m*/
var model = 0;

var increase = function(_event) {
  model = model + 1;
  m.render(element, view(model));
};

var view = function(model) {
  return [
    m("div", "Counter: " + model),
    m("button", { onclick: increase }, "+1")
  ];
};

var element = document.getElementById("app");
m.render(element, view(model));
