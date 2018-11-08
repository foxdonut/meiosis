/*global m*/
var view = function(model) {
  return m("div", model.label + ": " + model.value);
};

var initial = { label: "The Counter", value: 0 };
var element = document.getElementById("app");
m.render(element, view(initial));
