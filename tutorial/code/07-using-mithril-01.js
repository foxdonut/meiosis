/*global m, mergerino*/
const merge = mergerino;

var conditions = {
  initial: {
    precipitations: false,
    sky: "Sunny"
  },
  Actions: function(update) {
    return {
      togglePrecipitations: function(id, value) {
        update({ [id]: { precipitations: value } });
      },
      changeSky: function(id, value) {
        update({ [id]: { sky: value } });
      }
    };
  }
};

var skyOption = function({ state, id, actions, value, label }) {
  return m(
    "label",
    m("input", {
      type: "radio",
      id: value,
      name: "sky",
      value,
      checked: state[id].sky === value,
      onchange: evt => actions.changeSky(id, evt.target.value)
    }),
    label
  );
};

var Conditions = {
  view: function({ attrs: { state, id, actions } }) {
    return m(
      "div",
      m(
        "label",
        m("input", {
          type: "checkbox",
          checked: state[id].precipitations,
          onchange: evt =>
            actions.togglePrecipitations(id, evt.target.checked)
        }),
        "Precipitations"
      ),
      m(
        "div",
        skyOption({
          state,
          actions,
          id,
          value: "SUNNY",
          label: "Sunny"
        }),
        skyOption({
          state,
          id,
          actions,
          value: "CLOUDY",
          label: "Cloudy"
        }),
        skyOption({
          state,
          id,
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
        update({ [id]: { value: x => x + amount } });
      },
      changeUnits: function(id) {
        update({
          [id]: state => {
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
  initial: {
    conditions: conditions.initial,
    "temperature:air": temperature.Initial("Air"),
    "temperature:water": temperature.Initial("Water")
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
      m(Conditions, { state, id: "conditions", actions }),
      m(Temperature, { state, id: "temperature:air", actions }),
      m(Temperature, {
        state,
        id: "temperature:water",
        actions
      }),
      m("pre", JSON.stringify(state, null, 4))
    );
  }
};

var update = m.stream();
var states = m.stream.scan(merge, app.initial, update);
var actions = app.Actions(update);

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});
