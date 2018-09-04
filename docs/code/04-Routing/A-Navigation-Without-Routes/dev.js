/* global element, models, meiosisTracer */

// For development only, this code sets up the Meiosis Tracer.
const tracerElement = document.createElement("div");
tracerElement.id = "tracer";
tracerElement.style = "position: absolute; top: 0; right: 0";
element.parentNode.insertBefore(tracerElement, element.nextSibling);

meiosisTracer({ selector: "#tracer", streams: [ models ] });
