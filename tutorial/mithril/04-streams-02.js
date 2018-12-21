/*global m*/
var app = {
  initialState: {
    value: 0
  },
  actions: function(update) {
    return {
      increment: function() {
        update(1);
      },
      decrement: function() {
        update(-1);
      }
    };
  }
};

var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return [
      m("div", "Counter: " + state.value),
      m("button", { onclick: actions.increment }, "+1"),
      m("button", { onclick: actions.decrement }, "-1")
    ];
  }
};

var update = m.stream();
var states = m.stream.scan(function(state, increment) {
  state.value = state.value + increment;
  return state;
}, app.initialState, update);

var actions = app.actions(update);
m.mount(document.getElementById("app"), {
  view: function() {
    return m(App, { state: states(), actions: actions });
  }
});
