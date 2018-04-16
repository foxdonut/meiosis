/*global m*/

// -- Application code

var createView = function(update) {
  var oper = function(obj) {
    return function(_event) {
      update(obj);
    };
  };
  var view = function(model) {
    return [
      m("div", "Counter: " + model),
      m("button", { onclick: oper({ oper: "add", value: 1 }) }, "+1"),
      m("button", { onclick: oper({ oper: "times", value: 2 }) }, "*2")
    ];
  };
  return view;
};

// -- Meiosis pattern setup code

var update = m.stream();
var view = createView(update);

var models = m.stream.scan(function(model, obj) {
  if (obj.oper === "add") {
    return model + obj.value;
  }
  else if (obj.oper === "times") {
    return model * obj.value;
  }
  else {
    return model;
  }
}, 0, update);

var element = document.getElementById("app");

models.map(function(model) {
  m.render(element, view(model));
});
