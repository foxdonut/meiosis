/*global m*/
// Pass an object as the state
var state = { label: "The Counter", value: 0 };

var actions = {
  // Change the increment function to increment the model value
  increment: function(_event) {
    state.value = state.value + 1;
  },
  // Add a decrement function
  decrement: function(_event) {
    state.value = state.value - 1;
  }
};

var App = {
  // Use the state to produce the view
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return [
      m("div", "Counter: " + state.value),
      m("button", { onclick: actions.increment }, "+1"),
      // Add a -1 button that decrements the value
      m("button", { onclick: actions.decrement }, "-1")
    ];
  }
};

var element = document.getElementById("app");
m.mount(element, {
  view: function() {
    return m(App, { state: state, actions: actions });
  }
});