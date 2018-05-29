/* global flyd, createNavigation, createApp, createRouter, ReactDOM, meiosis, meiosisTracer */

// Meiosis Setup
const update = flyd.stream();
const stateNavigator = createNavigation(update);
const app = createApp(update, stateNavigator);
const models = flyd.scan((model, func) => func(model),
  {}, update);

// Rendering
const element = document.getElementById("app");
models.map(model => ReactDOM.render(app.view(model), element));

// Only for using Meiosis Tracer in development.
 meiosis.trace({ update, dataStreams: [ models ] });
 meiosisTracer({ selector: "#tracer" });
