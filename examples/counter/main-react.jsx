/*global window, meiosis, meiosisReact*/
(function() {
  var initialModel = { counter: 0 };

  var view = window.reactView;

  var receive = function(model, proposal) {
    return { counter: model.counter + proposal.add };
  };

  var Meiosis = meiosis.init();

  var Main = Meiosis.createComponent({
    initialModel: initialModel,
    view: view,
    receive: receive
  });

  Meiosis.run(meiosisReact.renderer().intoId(document, "reactApp"), Main);
})();
