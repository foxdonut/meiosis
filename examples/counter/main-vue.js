/*global window, meiosis, meiosisVue */
(function(ref) {
  var initialModel = { counter: 0 };

  var setup = ref.vueView(initialModel);

  var receive = function(model, proposal) {
    model.counter += proposal.add;
    return model;
  };

  var render = meiosisVue.renderer(initialModel, "counter");

  var Meiosis = meiosis.init();

  Meiosis.createComponent({
    initialModel: initialModel,
    setup: setup,
    receive: receive
  });

  Meiosis.run(render);
})(window);
