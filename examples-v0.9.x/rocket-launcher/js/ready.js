/*global meiosisVanillaJs, window*/
(function(ref) {
  var root = document.getElementById("app");
  var renderer = meiosisVanillaJs.renderer();

  ref.ready = function(actions) {
    renderer.delegate(root, "form.start", "submit", function(evt) {
      evt.preventDefault();
      actions.start();
    });

    renderer.delegate(root, "form.counting", "submit", function(evt) {
      evt.preventDefault();
      actions.abort();
    });
  };
})(window);
