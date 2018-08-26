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
    return (<div>
      {air.view(model)}
      {water.view(model)}
    </div>);
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
    return (<div className="temperature">
      <div>Units: &deg;{model.context.units}</div>
      <button onClick={changeUnits}>Change Units</button>
    </div>);
  };
  return { view: view };
};

var createApp = function(update) {
  var temperaturePair = nest(createTemperaturePair, update, "temperatures");
  var unitChanger = createUnitChanger(update);
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
