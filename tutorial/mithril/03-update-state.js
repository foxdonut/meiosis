/*global m*/
var state = {
  value: 0
};

var actions = {
  increase: function() {
    state.value = state.value + 1;
  }
};

var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return [
      m("div", "Counter: " + state.value),
      m("button", { onclick: () => actions.increase() }, "+1")
    ];
  }
};

var element = document.getElementById("app");
m.mount(element, {
  view: function() {
    return m(App, { state: state, actions: actions });
  }
});
