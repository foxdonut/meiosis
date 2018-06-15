/* global m, element, models, update, meiosis, meiosisTracer */

const tracerElement = document.createElement("div");
tracerElement.id = "tracer";
tracerElement.style = "position: absolute; top: 0; right: 0";
element.parentNode.insertBefore(tracerElement, element.nextSibling);

const I = x => x;
meiosis.trace({ update, dataStreams: [ models ], toUpdate: I });
meiosisTracer({ selector: "#tracer" });

models.map(model => {
  const url = model.url;
  if (url && document.location.hash !== url) {
    window.history.pushState({}, "", url);
  }
});
models.map(() => { m.redraw(); });
