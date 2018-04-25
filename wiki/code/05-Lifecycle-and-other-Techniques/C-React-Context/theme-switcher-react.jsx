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
    var changeUnits = function(_event) {
      update(function(model) {
        var newUnits = model.units === "C" ? "F" : "C";
        model.value = convert(model.value, newUnits);
        model.units = newUnits;
        return model;
      });
    };

    var model = function() {
      return Object.assign({ value: 22, units: "C" }, init);
    };

    var view = function(model) {
      return (<div className="temperature">
        <span>{label} Temperature: {model.value}&deg;{model.units}</span>
        <div>
          <button className={model.context.theme}
            onClick={increase( 1)}>Increase</button>
          <button className={model.context.theme}
            onClick={increase( -1)}>Decrease</button>
        </div>
        <div>
          <button className={model.context.theme}
            onClick={changeUnits}>Change Units</button>
        </div>
      </div>);
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
    return (<div>
      {air.view(model)}
      {water.view(Object.assign(model, { context: { theme: "light" } }))}
    </div>);
  };
  return { model: model, view: view };
};

var createThemeChanger = function(update) {
  var changeTheme = function(_event) {
    update(function(model) {
      model.context.theme = model.context.theme === "light" ? "dark" : "light";
      return model;
    });
  };
  var view = function(model) {
    return (<div>
      <div>Theme: {model.context.theme}</div>
      <button className={model.context.theme}
        onClick={changeTheme}>Change Theme</button>
    </div>);
  };
  return { view: view };
};

var createApp = function(update) {
  var temperaturePair = nest(createTemperaturePair, "temperatures", update);
  var themeChanger = createThemeChanger(update);
  var view = function(model) {
    return (<div>
      {temperaturePair.view(model)}
      {themeChanger.view(model)}
    </div>);
  };
  return {
    model: function() {
      return Object.assign(
        { context: { theme: "light" } },
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
