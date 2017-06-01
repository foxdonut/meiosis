/*global meiosis, meiosisSnabbdom, meiosisTracer, window*/
(function(ref) {
  var Main = meiosis.createComponent({
    view: ref.display(ref.state, ref.view),
    actions: ref.actions,
    receive: ref.receive(ref.state),
    nextAction: ref.nextAction(ref.state)
  });

  var state = function(model) {
    var appState = Object.assign({}, model);
    appState.even = model.counter % 2 === 0;
    appState.closeToLaunch = model.counter < 4;
    return appState;
  };

  var renderRoot = meiosis.run({ renderer: meiosisSnabbdom.renderer().intoId(document, "app"),
    initialModel: ref.initialModel, state: state, rootComponent: Main });

  meiosisTracer(meiosis.createComponent, renderRoot, "#tracer");
})(window);
