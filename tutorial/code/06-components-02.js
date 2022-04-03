/*global flyd, mergerino*/
const merge = mergerino;

var conditions = {
  initial: {
    precipitations: false,
    sky: 'Sunny'
  },
  Actions: function (update) {
    return {
      togglePrecipitations: function (id, value) {
        update({ [id]: { precipitations: value } });
      },
      changeSky: function (id, value) {
        update({ [id]: { sky: value } });
      }
    };
  }
};

var convert = function (value, to) {
  return Math.round(
    to === 'C' ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

var temperature = {
  initial: function () {
    return {
      value: 22,
      units: 'C'
    };
  },
  Actions: function (update) {
    return {
      increment: function (id, amount) {
        update({ [id]: { value: (x) => x + amount } });
      },
      changeUnits: function (id) {
        update({
          [id]: (state) => {
            var value = state.value;
            var newUnits = state.units === 'C' ? 'F' : 'C';
            var newValue = convert(value, newUnits);
            return {
              value: newValue,
              units: newUnits
            };
          }
        });
      }
    };
  }
};

var app = {
  initial: {
    conditions: conditions.initial,
    'temperature:air': temperature.initial(),
    'temperature:water': temperature.initial()
  },
  Actions: function (update) {
    return Object.assign(
      {},
      conditions.Actions(update),
      temperature.Actions(update)
    );
  }
};

var update = flyd.stream();
var states = flyd.scan(merge, app.initial, update);

// eslint-disable-next-line no-unused-vars
var actions = app.Actions(update);
states.map(function (state) {
  document.write(
    '<pre>' + JSON.stringify(state, null, 2) + '</pre>'
  );
});
