/*global m, P, S, PS*/
var convert = function(value, to) {
  return Math.round(
    (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
  );
};

var units = {
  initialState: function() {
    return "C";
  }
};

var Units = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div.temperature", [
      "Units: ", m.trust("&deg;"), state.units,
      m("div",
        m("button", { onclick: () => actions.changeUnits(state) }, "Change Units")
      )
    ]);
  }
};

var temperature = {
  initialState: function(label) {
    return {
      label,
      value: 22
    };
  },
  actions: function(update) {
    return {
      increment: function(id, amount) {
        update({ [id]: PS({ value: S(current => current + amount) }) });
      }
    };
  }
};

var Temperature = {
  view: function(vnode) {
    var { state, id, actions } = vnode.attrs;
    var myState = state[id];
    return m("div.temperature", [
      myState.label, " Temperature: ", myState.value, m.trust("&deg;"), state.units,
      m("div",
        m("button", { onclick: () => actions.increment(id,  1) }, "Increment"),
        m("button", { onclick: () => actions.increment(id, -1) }, "Decrement")
      )
    ]);
  }
};

var app = {
  initialState: {
    units: units.initialState(),
    air: temperature.initialState("Air"),
    water: temperature.initialState("Water")
  },
  actions: function(update) {
    return P({
      changeUnits: function(state) {
        var newUnits = state.units === "C" ? "F" : "C";
        update(Object.assign({ units: newUnits },
          ["air", "water"].reduce((result, id) => {
            result[id] = PS({ value: convert(state[id].value, newUnits) });
            return result;
          }, {})
        ));
      }
    }, temperature.actions(update));
  }
};

var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div", [
      m(Units, { state, actions }),
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
