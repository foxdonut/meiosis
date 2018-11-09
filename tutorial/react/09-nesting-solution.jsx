/*global React, ReactDOM, flyd*/

// -- Utility code

var nest = function(update, path) {
  return function(data) {
    update({ path: path, data: data });
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

// No need to change the createTemperature function
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

var createView = function(update) {
  var air = createTemperature(nest(update, "air"), "Air");
  var water = createTemperature(nest(update, "water"), "Water");
  // Add another temperature
  var indoor = createTemperature(nest(update, "indoor"), "Indoor");

  return function(model) {
    return (<div>
      {air(model.air)}
      {water(model.water)}
      {/* Display the temperature that we added */}
      {indoor(model.indoor)}
    </div>);
  };
};

// -- Meiosis pattern setup code

var update = flyd.stream();
var view = createView(update);

var models = flyd.scan(
  function(model, obj) {
    model[obj.path] = Object.assign(model[obj.path], obj.data);
    return model;
  },
  { air:   { value: 22, units: "C" },
    water: { value: 84, units: "F" },
    // Add model for temperature that we added
    indoor: { value: 21, units: "C" }
  },
  update);

var element = document.getElementById("app");

models.map(function(model) {
  ReactDOM.render(view(model), element);
});
