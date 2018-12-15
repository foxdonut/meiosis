/*global m*/
// Pass an object as the model
var model = { label: "The Counter", value: 0 };

// Change the increase function to increase the model value
var increase = function(_event) {
  model.value = model.value + 1;
  m.render(element, view(model));
};

// Add a decrease function
var decrease = function(_event) {
  model.value = model.value - 1;
  m.render(element, view(model));
};

// Use the model to produce the view
var view = function(model) {
  return [
    m("div", model.label + ": " + model.value),
    m("button", { onclick: increase }, "+1"),
    /* Add a -1 button that decreases the value */
    m("button", { onclick: decrease }, "-1")
  ];
};

var element = document.getElementById("app");
m.render(element, view(model));
