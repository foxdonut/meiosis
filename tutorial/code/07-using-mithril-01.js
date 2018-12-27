/*global m, P, S, PS*/
var conditions = {
  initialState: {
    conditions: {
      precipitations: false,
      sky: "Sunny"
    }
  },
  actions: function(update) {
    return {
      togglePrecipitations: function(value) {
        update({ conditions: PS({ precipitations: value }) });
      },
      changeSky: function(value) {
        update({ conditions: PS({ sky: value }) });
      }
    };
  }
};

var skyOption = function({ state, actions, value, label }) {
  return m("span",
    m("input", { type: "radio", id: value, name: "sky",
      value, checked: state.conditions.sky === value,
      onchange: evt => actions.changeSky(evt.target.value)
    }),
    m("label", { htmlFor: value }, label)
  );
};

var Conditions = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div",
      m("label",
        m("input", {
          type: "checkbox",
          checked: state.conditions.precipitations,
          onchange: evt => actions.togglePrecipitations(evt.target.checked)
        }),
        "Precipitations"
      ),
      m("div",
        skyOption({ state, actions, value: "SUNNY", label: "Sunny"}),
        skyOption({ state, actions, value: "CLOUDY", label: "Cloudy"}),
        skyOption({ state, actions, value: "MIX", label: "Mix of sun and clouds"})
      )
    );
  }
};

var convert = function(value, to) {
  return Math.round(
    (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
  );
};

var temperature = {
  initialState: function(label) {
    return {
      label,
      value: 22,
      units: "C"
    };
  },
  actions: function(update) {
    return {
      increment: function(id, amount) {
        update({ [id]: PS({ value: S(x => x + amount) }) });
      },
      changeUnits: function(id) {
        update({
          [id]: S(state => {
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
  view: function(vnode) {
    var { state, id, actions } = vnode.attrs;
    return m("div",
      state[id].label, " Temperature: ",
      state[id].value, m.trust("&deg;"), state[id].units,
      m("div",
        m("button", { onclick: () => actions.increment(id, 1) }, "Increment"),
        m("button", { onclick: () => actions.increment(id,-1) }, "Decrement")
      ),
      m("div",
        m("button", { onclick: () => actions.changeUnits(id) }, "Change Units")
      )
    );
  }
};

var app = {
  initialState: Object.assign({},
    conditions.initialState,
    { air: temperature.initialState("Air") },
    { water: temperature.initialState("Water") }
  ),
  actions: function(update) {
    return Object.assign({},
      conditions.actions(update),
      temperature.actions(update)
    );
  }
};

var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div",
      m(Conditions, { state, actions }),
      m(Temperature, { state, id: "air", actions }),
      m(Temperature, { state, id: "water", actions }),
      m("pre", JSON.stringify(state, null, 4))
    );
  }
};

var update = m.stream();
var states = m.stream.scan(P, app.initialState, update);

var actions = app.actions(update);
m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});
