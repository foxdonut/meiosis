/*global m*/
var App = {
  view: function(vnode) {
    return m("div", "Counter: " + vnode.attrs.state);
  }
};
var initialState = 0;
var element = document.getElementById("app");
m.mount(element, {
  view: function() {
    return m(App, { state: initialState });
  }
});
