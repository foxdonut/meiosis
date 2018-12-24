/*global m, P, S, PS*/
var conditions = {
  initialState: "Sunny",
  actions: function(update) {
    return {
      setConditions: function(conditions) {
        update({ conditions: conditions });
      }
    };
  }
};

var Conditions = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div.temperature", [
      ["Sunny", "Cloudy", "Rain"].map(key =>
        m("label", [
          m("input", { type: "radio", name: "conditions", value: key,
            checked: state.conditions === key,
            onchange: () => actions.setConditions(key)
          }),
          key, " "
        ])
      )
    ]);
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
        update({ [id]: PS({ value: S(current => current + amount) }) });
      },
      changeUnits: function(id, state) {
        var newUnits = state[id].units === "C" ? "F" : "C";
        var newValue = convert(state[id].value, newUnits);
        update({ [id]: PS({ value: newValue, units: newUnits }) });
      }
    };
  }
};

var Temperature = {
  view: function(vnode) {
    var { state, id, actions } = vnode.attrs;
    var myState = state[id];
    return m("div.temperature", [
      myState.label, " Temperature: ", myState.value, m.trust("&deg;"), myState.units,
      m("div",
        m("button", { onclick: () => actions.increment(id,  1) }, "Increment"),
        m("button", { onclick: () => actions.increment(id, -1) }, "Decrement")
      ),
      m("div",
        m("button", { onclick: () => actions.changeUnits(id, state) }, "Change Units")
      )
    ]);
  }
};

var app = {
  initialState: {
    conditions: conditions.initialState,
    air: temperature.initialState("Air"),
    water: temperature.initialState("Water")
  },
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
    return m("div", [
      m(Conditions, { state, actions }),
      m(Temperature, { state, id: "air", actions }),
      m(Temperature, { state, id: "water", actions })
    ]);
  }
};

var update = m.stream();
var states = m.stream.scan(P, app.initialState, update);

var actions = app.actions(update);
m.mount(document.getElementById("app"), {
  view: function() {
    return m(App, { state: states(), actions: actions });
  }
});
