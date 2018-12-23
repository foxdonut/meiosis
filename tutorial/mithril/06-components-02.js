/*global m, P, S, PS*/
var convert = function(value, to) {
  return Math.round(
    (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
  );
};

var temperature = {
  initialState: {
    value: 22,
    units: "C"
  },
  actions: function(update) {
    return {
      increment: function(amount) {
        update({ temperature: PS({ value: S(current => current + amount) }) });
      },
      changeUnits: function(state) {
        var newUnits = state.temperature.units === "C" ? "F" : "C";
        var newValue = convert(state.temperature.value, newUnits);
        update({ temperature: PS({ value: newValue, units: newUnits }) });
      }
    };
  }
};

var Temperature = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    var myState = state.temperature;
    return m("div.temperature", [
      myState.label, " Temperature: ", myState.value, m.trust("&deg;"), myState.units,
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

var app = {
  initialState: {
    temperature: temperature.initialState,
  },
  actions: temperature.actions
};

var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div", [
      m(Temperature, { state, actions })
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
