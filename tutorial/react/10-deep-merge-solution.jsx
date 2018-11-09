/*global React, ReactDOM, flyd, _*/

// -- Utility code

var nest = function(update, prop) {
  return function(obj) {
    var result = {};
    result[prop] = obj;
    update(result);
  };
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

var createTemperature = function(update, label) {
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
  return view;
};

var createTemperaturePair = function(update) {
  var air = createTemperature(nest(update, "air"), "Air");
  var water = createTemperature(nest(update, "water"), "Water");

  return function(model) {
    return (<div>
      {air(model.air)}
      {water(model.water)}
    </div>);
  };
};

var createHumidity = function(update, label) {
  var increase = function(model, amount) {
    return function(_event) {
      update({ value: model.value + amount });
    };
  };

  var view = function(model) {
    return (<div className="humidity">
      <span>{label} Humidity: {model.value}%</span>
      <div>
        <button onClick={increase(model, 1)}>Increase</button>
        <button onClick={increase(model,-1)}>Decrease</button>
      </div>
    </div>);
  };
  return view;
};

var createHumidityPair = function(update) {
  var indoor = createHumidity(nest(update, "indoor"), "Indoor");
  var outdoor = createHumidity(nest(update, "outdoor"), "Outdoor");

  return function(model) {
    return (<div>
      {indoor(model.indoor)}
      {outdoor(model.outdoor)}
    </div>);
  };
};

var createView = function(update) {
  var pair = createTemperaturePair(nest(update, "temperatures"));
  var humidities = createHumidityPair(nest(update, "humidities"));

  return function(model) {
    return (
      <div>
        {pair(model.temperatures)}
        {humidities(model.humidities)}
      </div>
    );
  };
};

// -- Meiosis pattern setup code

var update = flyd.stream();
var view = createView(update);

var models = flyd.scan(_.merge, {
  temperatures:
    { air:   { value: 22, units: "C" },
      water: { value: 84, units: "F" }
    },
  // Add other elements next to temperatures
  humidities:
    { indoor: { value: 40 },
      outdoor: { value: 60 }
    }
}, update);

var element = document.getElementById("app");

models.map(function(model) {
  ReactDOM.render(view(model), element);
});
