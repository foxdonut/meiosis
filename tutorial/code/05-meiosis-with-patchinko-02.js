/*global flyd, O*/
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
          temperature: O({
            value: O(x => x + amount)
          })
        });
      },
      changeUnits: function() {
        update({
          temperature: O(state => {
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

var update = flyd.stream();
var states = flyd.scan(O, temperature.Initial(), update);

var actions = temperature.Actions(update);
states.map(function(state) {
  document.write(
    "<pre>" + JSON.stringify(state, null, 2) + "</pre>"
  );
});
