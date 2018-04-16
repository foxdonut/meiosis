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
          <button onClick={increase( 1)}>Increase</button>
          <button onClick={increase(-1)}>Decrease</button>
        </div>
        <div>
          <button onClick={changeUnits}>Change Units</button>
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
      {water.view(model)}
    </div>);
  };
  return { model: model, view: view };
};

var createApp = function(update) {
  return nest(createTemperaturePair, "temperatures", update);
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
