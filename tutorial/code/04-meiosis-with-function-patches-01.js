/*global flyd*/
var convert = function(value, to) {
  return Math.round(
    to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

var temperature = {
  initialState: {
    temperature: {
      value: 22,
      units: "C"
    }
  },
  actions: function(update) {
    return {
      increment: function(amount) {
        update(function(state) {
          state.temperature.value += amount;
          return state;
        });
      },
      changeUnits: function() {
        update(function(state) {
          var value = state.temperature.value;
          var newUnits =
            state.temperature.units === "C" ? "F" : "C";
          var newValue = convert(value, newUnits);
          state.temperature.value = newValue;
          state.temperature.units = newUnits;
          return state;
        });
      }
    };
  }
};

var update = flyd.stream();
var states = flyd.scan(
  function(state, patch) {
    return patch(state);
  },
  temperature.initialState,
  update
);

var actions = temperature.actions(update);
states.map(function(state) {
  document.write(
    "<pre>" + JSON.stringify(state, null, 2) + "</pre>"
  );
});
