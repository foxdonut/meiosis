/*global React, ReactDOM, flyd*/

// -- Application code

var convert = function(value, to) {
  if (to === "C") {
    return Math.round( (value - 32) / 9 * 5 );
  }
  else {
    return Math.round( value * 9 / 5 + 32 );
  }
};

var createView = function(update) {
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
  // Add a reset action
  var reset = function(model) {
    return function(_event) {
      var newValue = model.units === "C" ? 22 : 72;
      update({ value: newValue });
    };
  };

  var view = function(model) {
    return (<div>
      <span>Temperature: {model.value}&deg;{model.units}</span>
      <div>
        <button onClick={increase(model, 1)}>Increase</button>
        <button onClick={increase(model,-1)}>Decrease</button>
      </div>
      <div>
        <button onClick={changeUnits(model)}>Change Units</button>
        {/* Add a reset button */}
        <button onClick={reset(model)}>Reset</button>
      </div>
    </div>);
  };
  return view;
};

// -- Meiosis pattern setup code

var update = flyd.stream();
var view = createView(update);

var models = flyd.scan(Object.assign,
  { value: 22, units: "C" }, update);

var element = document.getElementById("app");

models.map(function(model) {
  ReactDOM.render(view(model), element);
});
