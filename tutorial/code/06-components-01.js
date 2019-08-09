/*global flyd, mergerino*/
const merge = mergerino;

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
        update({ conditions: { precipitations: value } });
      },
      changeSky: function(value) {
        update({ conditions: { sky: value } });
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
      temperature: {
        value: 22,
        units: "C"
      }
    };
  },
  Actions: function(update) {
    return {
      increment: function(amount) {
        update({
          temperature: { value: x => x + amount }
        });
      },
      changeUnits: function() {
        update({
          temperature: state => {
            var value = state.value;
            var newUnits = state.units === "C" ? "F" : "C";
            var newValue = convert(value, newUnits);
            state.value = newValue;
            state.units = newUnits;
            return state;
          }
        });
      }
    };
  }
};

var app = {
  Initial: function() {
    return Object.assign(
      {},
      conditions.Initial(),
      temperature.Initial()
    );
  },
  Actions: function(update) {
    return Object.assign(
      {},
      conditions.Actions(update),
      temperature.Actions(update)
    );
  }
};

var update = flyd.stream();
var states = flyd.scan(merge, app.Initial(), update);

var actions = app.Actions(update);
states.map(function(state) {
  document.write(
    "<pre>" + JSON.stringify(state, null, 2) + "</pre>"
  );
});
