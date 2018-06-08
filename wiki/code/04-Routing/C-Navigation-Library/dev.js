/* global element, models, update, meiosis, meiosisTracer */

const tracerElement = document.createElement("div");
tracerElement.id = "tracer";
tracerElement.style = "position: absolute; top: 0; right: 0";
element.parentNode.insertBefore(tracerElement, element.nextSibling);

meiosis.trace({ update, dataStreams: [ models ]});
meiosisTracer({ selector: "#tracer" });

// The url is part of the view. Display it in the browser's location bar.
models.map(model => {
  const url = "#" + model.url;
  if (url && document.location.hash !== url) {
    window.history.pushState({}, "", url);
  }
});
