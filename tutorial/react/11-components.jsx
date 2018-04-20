/*global ReactDOM, flyd, _*/

// -- Utility code

var nestUpdate = function(update, prop) {
  return function(obj) {
    var result = {};
    result[prop] = obj;
    update(result);
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
      return (<div className="temperature">
        <span>{label} Temperature: {model.value}&deg;{model.units}</span>
        <div>
          <button onClick={increase(model, 1)}>Increase</button>
          <button onClick={increase(model,-1)}>Decrease</button>
        </div>
        <div>
          <button onClick={changeUnits(model)}>Change Units</button>
        </div>
      </div>);
    };
    return { model: model, view: view };
  };
};

var createTemperaturePair = function(update) {
  var air = nest(createTemperature("Air"), update, "air");
  var water = nest(createTemperature("Water", { value: 84, units: "F" }),
    update, "water");

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
  return nest(createTemperaturePair, update, "temperatures");
};

// -- Meiosis pattern setup code

var update = flyd.stream();
var app = createApp(update);

var models = flyd.scan(_.merge, app.model(), update);

var element = document.getElementById("app");

models.map(function(model) {
  ReactDOM.render(app.view(model), element);
});
