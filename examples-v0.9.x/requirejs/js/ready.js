/*global define*/
define(["meiosisVanillaJs"], function(meiosisVanillaJs) {
  var renderer = meiosisVanillaJs.renderer();

  return function(propose) {
    renderer.delegate(document.body, "button#inc", "click", function() {
      propose({ add: 1 });
    });
    renderer.delegate(document.body, "button#decr", "click", function() {
      propose({ add: -1 });
    });
  };
});
