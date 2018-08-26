/*global m*/

// -- Utility code

var nestUpdate = function(update, prop) {
  return function(func) {
    update(function(model) {
      model[prop] = func(model[prop]);
      return model;
    });
  };
};

var nest = function(create, update, prop) {
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
      return component.view(Object.assign(
        { context: model.context },
        model[prop])
      );
    };
  }
  return result;
};

// -- Application code

var createTemperature = function(label, init) {
  return function(update) {
    var increase = function(amount) {
      return function(_event) {
        update(function(model) {
          model.value += amount;
          return model;
        });
      };
    };

    var model = function() {
      return Object.assign({ value: 22 }, init);
    };

    var view = function(model) {
      return m("div.temperature", [
        label, " Temperature: ", model.value, m.trust("&deg;"), model.context.units,
        m("div",
          m("button", { onclick: increase( 1) }, "Increase"),
          m("button", { onclick: increase(-1) }, "Decrease")
        )
      ]);
    };
    return { model: model, view: view };
  };
};

var createTemperaturePair = function(update) {
  var air = nest(createTemperature("Air"), update, "air");
  var water = nest(createTemperature("Water"), update, "water");

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

var createUnitChanger = function(update) {
  var changeUnits = function(_event) {
    update(function(model) {
      model.context.units = model.context.units === "C" ? "F" : "C";
      return model;
    });
  };
  var view = function(model) {
    return m("div.temperature", [
      m("div", "Units: ", m.trust("&deg;"), model.context.units),
      m("button", { onclick: changeUnits }, "Change Units")
    ]);
  };
  return { view: view };
};

var createApp = function(update) {
  var temperaturePair = nest(createTemperaturePair, update, "temperatures");
  var unitChanger = createUnitChanger(update, temperaturePair);
  var view = function(model) {
    return [
      unitChanger.view(model),
      temperaturePair.view(model)
    ];
  };
  return {
    model: function() {
      return Object.assign(
        { context: { units: "C" } },
        temperaturePair.model()
      );
    },
    view: view
  };
};

// -- Meiosis pattern setup code

var update = m.stream();
var app = createApp(update);

var models = m.stream.scan(function(model, func) {
  return func(model);
}, app.model(), update);

var element = document.getElementById("app");

models.map(function(model) {
  m.render(element, app.view(model));
});
