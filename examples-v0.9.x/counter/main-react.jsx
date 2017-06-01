/*global window, meiosis, meiosisReact*/
(function() {
  var initialModel = { counter: 0 };

  var view = window.reactView;

  var receive = function(model, proposal) {
    return { counter: model.counter + proposal.add };
  };

  var Meiosis = meiosis.newInstance();

  var Main = Meiosis.createComponent({
    view: view,
    receive: receive
  });

  Meiosis.run({ renderer: meiosisReact.renderer().intoId(document, "reactApp"),
    initialModel: initialModel, rootComponent: Main });
})();
