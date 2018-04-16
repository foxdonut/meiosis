/*global m, _*/

// -- Utility code

var nestUpdate = function(update, prop) {
  return function(obj) {
    var result = {};
    result[prop] = obj;
    update(result);
  };
};

var nest = function(create, prop, update) {
  var component = create(nestUpdate(update, prop));
  var result = Object.assign({}, component);
  if (component.model) {
    result.model = function() {
      var initialModel = {};
      initialModel[prop] = component.model();
      return initialModel;
    };
  }
  if (component.view) {
    result.view = function(model) {
      return component.view(model[prop]);
    };
  }
  return result;
};

// -- Application code

var convert = function(value, to) {
  if (to === "C") {
    return Math.round( (value - 32) / 9 * 5 );
  }
  else {
    return Math.round( value * 9 / 5 + 32 );
  }
};

var createTemperature = function(label, init) {
  return function(update) {
    var increase = function(model, amount) {
      return function(_event) {
        update({ value: model.value + amount });
      };
    };
    var changeUnits = function(model) {
      return function(_event) {
        var newUnits = model.units === "C" ? "F" : "C";
        var newValue = convert(model.value, newUnits);
        update({ value: newValue, units: newUnits });
      };
    };

    var model = function() {
      return Object.assign({ value: 22, units: "C" }, init);
    };

    var view = function(model) {
      return m("div.temperature", [
        label, " Temperature: ", model.value, m.trust("&deg;"), model.units,
        m("div",
          m("button", { onclick: increase(model, 1) }, "Increase"),
          m("button", { onclick: increase(model,-1) }, "Decrease")
        ),
        m("div",
          m("button", { onclick: changeUnits(model) }, "Change Units")
        )
      ]);
    };
    return { model: model, view: view };
  };
};

var createTemperaturePair = function(update) {
  var air = nest(createTemperature("Air"), "air", update);
  var water = nest(createTemperature("Water", { value: 84, units: "F" }),
    "water", update);

  var model = function() {
    return Object.assign(air.model(), water.model());
  };

  var view = function(model) {
    return [
      air.view(model),
      water.view(model)
    ];
  };
  return { model: model, view: view };
};

var createApp = function(update) {
  return nest(createTemperaturePair, "temperatures", update);
};

// -- Meiosis pattern setup code

var update = m.stream();
var app = createApp(update);

var models = m.stream.scan(_.merge, app.model(), update);

var element = document.getElementById("app");

models.map(function(model) {
  m.render(element, app.view(model));
});
