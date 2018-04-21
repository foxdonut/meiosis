/* global ReactDOM, flyd */

const update = flyd.stream();
const app = createApp(update);
const models = flyd.scan(P, app.model(), update);

const element = document.getElementById("app");
models.map(model => ReactDOM.render(app.view(model), element));

// Only for using Meiosis Tracer in development.
meiosis.trace({ update, dataStreams: [ models ], toUpdate: I });
meiosisTracer({ selector: "#tracer" });
