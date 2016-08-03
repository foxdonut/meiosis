/*global meiosis, meiosisRiot*/
(function(ref) {
  var initialModel = { store: { counter: 0 } };

  var receive = function(model, proposal) {
    return { store: { counter: model.store.counter + proposal.add } };
  };

  var actions = function(propose) {
    return {
      onInc: function() {
        propose({ add: 3 });
      },
      onDecr: function() {
        propose({ add: -3 });
      }
    };
  };

  var Meiosis = meiosis.init();

  var setup = function(actions) {
    ref.riotView(actions);
  };

  var Main = Meiosis.createComponent({
    initialModel: initialModel,
    actions: actions,
    receive: receive,
    setup: setup
  });

  Meiosis.run(meiosisRiot.renderer("counter").intoId(document, "riotApp"), Main);
})(window);
