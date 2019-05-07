/*global m, O*/
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

var skyOption = function({ state, actions, value, label }) {
  return m(
    "label",
    m("input", {
      type: "radio",
      id: value,
      name: "sky",
      value,
      checked: state.conditions.sky === value,
      onchange: evt => actions.changeSky(evt.target.value)
    }),
    label
  );
};

var Conditions = {
  view: function({ attrs: { state, actions } }) {
    return m(
      "div",
      m(
        "label",
        m("input", {
          type: "checkbox",
          checked: state.conditions.precipitations,
          onchange: evt =>
            actions.togglePrecipitations(evt.target.checked)
        }),
        "Precipitations"
      ),
      m(
        "div",
        skyOption({
          state,
          actions,
          value: "SUNNY",
          label: "Sunny"
        }),
        skyOption({
          state,
          actions,
          value: "CLOUDY",
          label: "Cloudy"
        }),
        skyOption({
          state,
          actions,
          value: "MIX",
          label: "Mix of sun/clouds"
        })
      )
    );
  }
};

var convert = function(value, to) {
  return Math.round(
    to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

var temperature = {
  Initial: function(label) {
    return {
      label,
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

var Temperature = {
  view: function({ attrs: { state, id, actions } }) {
    return m(
      "div",
      state[id].label,
      " Temperature: ",
      state[id].value,
      m.trust("&deg;"),
      state[id].units,
      m(
        "div",
        m(
          "button",
          { onclick: () => actions.increment(id, 1) },
          "Increment"
        ),
        m(
          "button",
          { onclick: () => actions.increment(id, -1) },
          "Decrement"
        )
      ),
      m(
        "div",
        m(
          "button",
          { onclick: () => actions.changeUnits(id) },
          "Change Units"
        )
      )
    );
  }
};

var app = {
  Initial: function() {
    return Object.assign(
      {},
      conditions.Initial(),
      { air: temperature.Initial("Air") },
      { water: temperature.Initial("Water") }
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

var App = {
  view: function({ attrs: { state, actions } }) {
    return m(
      "div",
      m(Conditions, { state, actions }),
      m(Temperature, { state, id: "air", actions }),
      m(Temperature, { state, id: "water", actions }),
      m("pre", JSON.stringify(state, null, 4))
    );
  }
};

var update = m.stream();
var states = m.stream.scan(O, app.Initial(), update);
var actions = app.Actions(update);

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});
