/*global flyd, P, S, PS*/
var conditions = {
  initialState: {
    conditions: "Sunny"
  },
  actions: function(update) {
    return {
      setConditions: function(conditions) {
        update({ conditions: conditions });
      }
    };
  }
};

var convert = function(value, to) {
  return Math.round(
    (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
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
        update({ temperature: PS({ value: S(x => x + amount) }) });
      },
      changeUnits: function() {
        update({
          temperature: S(state => {
            var value = state.value;
            var newUnits = state.units === "C" ? "F" : "C";
            var newValue = convert(value, newUnits);
            state.value = newValue;
            state.units = newUnits;
            return state;
          })
        });
      }
    };
  }
};

var app = {
  initialState: Object.assign({},
    conditions.initialState,
    temperature.initialState
  ),
  actions: function(update) {
    return Object.assign({},
      conditions.actions(update),
      temperature.actions(update)
    );
  }
};

var update = flyd.stream();
var states = flyd.scan(P, app.initialState, update);

var actions = app.actions(update);
states.map(function(state) {
  document.write("<pre>" + JSON.stringify(state, null, 2) + "</pre>");
});
