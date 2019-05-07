/*global flyd, O*/
var conditions = {
  Initial: function() {
    return {
      conditions: {
        precipitations: false,
        sky: "Sunny"
      }
    };
  },
  Actions: function(update) {
    return {
      togglePrecipitations: function(value) {
        update({ conditions: O({ precipitations: value }) });
      },
      changeSky: function(value) {
        update({ conditions: O({ sky: value }) });
      }
    };
  }
};

var convert = function(value, to) {
  return Math.round(
    to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

var temperature = {
  Initial: function() {
    return {
      value: 22,
      units: "C"
    };
  },
  Actions: function(update) {
    return {
      increment: function(id, amount) {
        update({ [id]: O({ value: O(x => x + amount) }) });
      },
      changeUnits: function(id) {
        update({
          [id]: O(state => {
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
  Initial: function() {
    return O(
      {},
      conditions.Initial(),
      { air: temperature.Initial() },
      { water: temperature.Initial() }
    );
  },
  Actions: function(update) {
    return O(
      {},
      conditions.Actions(update),
      temperature.Actions(update)
    );
  }
};

var update = flyd.stream();
var states = flyd.scan(O, app.Initial(), update);

var actions = app.Actions(update);
states.map(function(state) {
  document.write(
    "<pre>" + JSON.stringify(state, null, 2) + "</pre>"
  );
});
