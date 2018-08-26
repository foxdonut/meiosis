/*global ReactDOM, flyd*/

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
      return (<div className="temperature">
        <span>{label} Temperature: {model.value}&deg;{model.context.units}</span>
        <div>
          <button onClick={increase( 1)}>Increase</button>
          <button onClick={increase(-1)}>Decrease</button>
        </div>
      </div>);
    };

    var changeUnits = function(newUnits) {
      update(function(model) {
        model.value = convert(model.value, newUnits);
        return model;
      });
    };

    return { model: model, view: view, changeUnits: changeUnits };
  };
};

var createTemperaturePair = function(update) {
  var air = nest(createTemperature("Air"), update, "air");
  var water = nest(createTemperature("Water"), update, "water");

  var model = function() {
    return Object.assign(air.model(), water.model());
  };

  var view = function(model) {
    return (<div>
      {air.view(model)}
      {water.view(model)}
    </div>);
  };

  var changeUnits = function(newUnits) {
    air.changeUnits(newUnits);
    water.changeUnits(newUnits);
  };
  return { model: model, view: view, changeUnits: changeUnits };
};

var createUnitChanger = function(update, temperaturePair) {
  var changeUnits = function(currentUnits) {
    return function(_event) {
      var newUnits = currentUnits === "C" ? "F" : "C";
      temperaturePair.changeUnits(newUnits);
      update(function(model) {
        model.context.units = newUnits;
        return model;
      });
    };
  };
  var view = function(model) {
    return (<div className="temperature">
      <div>Units: &deg;{model.context.units}</div>
      <button onClick={changeUnits(model.context.units)}>Change Units</button>
    </div>);
  };
  return { view: view };
};

var createApp = function(update) {
  var temperaturePair = nest(createTemperaturePair, update, "temperatures");
  var unitChanger = createUnitChanger(update, temperaturePair);
  var view = function(model) {
    return (<div>
      {unitChanger.view(model)}
      {temperaturePair.view(model)}
    </div>);
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

var update = flyd.stream();
var app = createApp(update);

var models = flyd.scan(function(model, func) {
  return func(model);
}, app.model(), update);

var element = document.getElementById("app");

models.map(function(model) {
  ReactDOM.render(app.view(model), element);
});
