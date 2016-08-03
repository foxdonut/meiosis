/*global meiosis, meiosisVanillaJs, meiosisTracer, window*/
(function(ref) {
  var Main = meiosis.createComponent({
    initialModel: ref.initialModel,
    view: ref.display(ref.state, ref.view),
    actions: ref.actions,
    ready: ref.ready,
    receive: ref.receive(ref.state),
    nextAction: ref.nextAction(ref.state)
  });

  var renderRoot = meiosis.run(meiosisVanillaJs.renderer().intoId(document, "app"), Main);

  meiosisTracer(meiosis.createComponent, renderRoot, "#tracer");
})(window);
