/*global meiosisSnabbdom*/
(function(ref) {
  var h = meiosisSnabbdom.renderer.h;

  ref.view = {
    // State representation of the ready state
    ready: (model, actions) => {
      const onStart = function(evt) {
        evt.preventDefault();
        actions.start();
      };
      return h("div", [
        h("p", "Counter: " + model.counter),
        h("form", [
          h("input.btn.btn-primary", {attrs: {type: "submit", value: "Start"}, on: {click: onStart}})
        ])
      ]);
    },

    // State representation of the counting state
    counting: (model, actions) => {
      const onAbort = function(evt) {
        evt.preventDefault();
        actions.abort();
      };
      return h("div", [
        h("p", "Count down: " + model.counter),
        h("form", [
          h("input.btn.btn-danger", {attrs: {type: "submit", value: "Abort"}, on: {click: onAbort}})
        ])
      ]);
    },

    // State representation of the aborted state
    aborted: model => h("p", "Aborted at Counter: " + model.counter),

    // State representation of the launched state
    launched: () => h("p", "Launched")
  };
})(window);
