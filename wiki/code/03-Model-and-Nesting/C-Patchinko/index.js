/* global ReactDOM, flyd, O, meiosis, meiosisTracer, createApp */

const update = flyd.stream();
const app = createApp(update);
const models = flyd.scan(O, app.model(), update);

const element = document.getElementById("app");
models.map(model => ReactDOM.render(app.view(model), element));

// Only for using Meiosis Tracer in development.
meiosis.trace({ update, dataStreams: [ models ], toUpdate: x => x });
meiosisTracer({ selector: "#tracer" });
