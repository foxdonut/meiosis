/*global m*/
var App = {
  view: function() {
    return m("h1", "Hello, world");
  }
};
var element = document.getElementById("app");
m.mount(element, App);
