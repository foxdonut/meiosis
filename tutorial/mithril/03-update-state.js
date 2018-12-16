/*global m*/
var state = 0;

var actions = {
  increase: function() {
    state = state + 1;
  }
};

var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return [
      m("div", "Counter: " + state),
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
