/* global ReactDOM, flyd, createApp, meiosisTracer */

const update = flyd.stream();
const app = createApp(update);
const models = flyd.scan((model, func) => func(model),
  app.model(), update);

const element = document.getElementById("app");
models.map(model => { ReactDOM.render(app.view(model), element); });

// Only for using Meiosis Tracer in development.
meiosisTracer({ selector: "#tracer", streams: [ models ], cols: 30 });
