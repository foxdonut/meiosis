/*global m, P, S*/
var convert = function(value, to) {
  return Math.round(
    (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
  );
};

var app = {
  initialState: {
    value: 22,
    units: "C"
  },
  actions: function(update) {
    return {
      increment: function(amount) {
        update({ value: S(current => current + amount) });
      },
      changeUnits: function(state) {
        var newUnits = state.units === "C" ? "F" : "C";
        var newValue = convert(state.value, newUnits);
        update({ value: newValue, units: newUnits });
      }
    };
  }
};

var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div.temperature", [
      "Temperature: ", state.value, m.trust("&deg;"), state.units,
      m("div",
        m("button", { onclick: () => actions.increment( 1) }, "Increment"),
        m("button", { onclick: () => actions.increment(-1) }, "Decrement")
      ),
      m("div",
        m("button", { onclick: () => actions.changeUnits(state) }, "Change Units")
      )
    ]);
  }
};

var update = m.stream();
var states = m.stream.scan(function(state, patch) {
  return P(state, patch);
}, app.initialState, update);

var actions = app.actions(update);
m.mount(document.getElementById("app"), {
  view: function() {
    return m(App, { state: states(), actions: actions });
  }
});
