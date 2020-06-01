/*global flyd, mergerino*/
const merge = mergerino;

var convert = function (value, to) {
  return Math.round(
    to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

var temperature = {
  initial: {
    temperature: {
      value: 22,
      units: "C"
    }
  },
  Actions: function (update) {
    return {
      increment: function (amount) {
        update({
          temperature: {
            value: x => x + amount
          }
        });
      },
      changeUnits: function () {
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

var update = flyd.stream();
var states = flyd.scan(merge, temperature.initial, update);

// eslint-disable-next-line no-unused-vars
var actions = temperature.Actions(update);
states.map(function (state) {
  document.write(
    "<pre>" + JSON.stringify(state, null, 2) + "</pre>"
  );
});
