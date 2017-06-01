/*global meiosis, meiosisVanillaJs, meiosisTracer, window*/
(function(ref) {
  var Main = meiosis.createComponent({
    view: ref.display(ref.state, ref.view),
    actions: ref.actions,
    ready: ref.ready,
    receive: ref.receive(ref.state),
    nextAction: ref.nextAction(ref.state)
  });

  var state = function(model) {
    var appState = Object.assign({}, model);
    appState.even = model.counter % 2 === 0;
    appState.closeToLaunch = model.counter < 4;
    return appState;
  };

  var renderRoot = meiosis.run({ renderer: meiosisVanillaJs.renderer().intoId(document, "app"),
    initialModel: ref.initialModel, state: state, rootComponent: Main });

  meiosisTracer(meiosis.createComponent, renderRoot, "#tracer");
})(window);
