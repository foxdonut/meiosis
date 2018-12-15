/*global m*/
var App = {
  view: function(vnode) {
    var state = vnode.attrs.state;
    return m("div", state.label + ": " + state.value);
  }
};
var initialState = { label: "The Counter", value: 0 };
var element = document.getElementById("app");
m.mount(element, {
  view: function() {
    return m(App, { state: initialState });
  }
});
