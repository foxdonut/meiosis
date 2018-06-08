/* global m, prefix, App, element, models, update, meiosis, meiosisTracer */

const tracerElement = document.createElement("div");
tracerElement.id = "tracer";
tracerElement.style = "position: absolute; top: 0; right: 0";
element.parentNode.insertBefore(tracerElement, element.nextSibling);

meiosis.trace({ update, dataStreams: [ models ]});
meiosisTracer({ selector: "#tracer" });

models.map(model => {
  const url = prefix + App.navigator.getUrl(model.pageId, model.params);
  if (url && document.location.hash !== url) {
    window.history.pushState({}, "", url);
  }
});

models.map(() => { m.redraw(); });
