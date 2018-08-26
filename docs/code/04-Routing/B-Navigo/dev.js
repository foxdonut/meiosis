/* global element, models, update, meiosis, meiosisTracer */

// For development only, this code sets up the Meiosis Tracer.
const tracerElement = document.createElement("div");
tracerElement.id = "tracer";
tracerElement.style = "position: absolute; top: 0; right: 0";
element.parentNode.insertBefore(tracerElement, element.nextSibling);

meiosis.trace({ update, dataStreams: [ models ]});
meiosisTracer({ selector: "#tracer" });

// Display the url in the browser's location bar.
models.map(model => {
  const url = model.url;
  if (url && document.location.hash !== url) {
    window.history.pushState({}, "", url);
  }
});
