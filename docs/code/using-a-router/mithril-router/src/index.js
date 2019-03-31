import m from "mithril";
import stream from "mithril/stream";
import { P } from "patchinko/explicit";

import { app, App } from "./app";
import { createRoutes } from "./router";

const update = stream();

Promise.resolve().then(app.initialState).then(initialState => {
  const models = stream.scan(P, initialState, update);

  const accept = models.map(state =>
    app.accept.reduce((x, f) => P(x, f(x)), state)
  );

  const computed = accept.map(state =>
    app.computed.reduce((x, f) => P(x, f(x)), state)
  );

  computed.map(state => app.services.map(service => service(state, update)));

  const states = stream();
  computed.map(states);

  // Only for using Meiosis Tracer in development.
  require("meiosis-tracer")({
    selector: "#tracer",
    rows: 10,
    streams: [
      { stream: update, label: "update" },
      { stream: states, label: "states" }
    ]
  });

  const actions = app.actions(update);

  m.route(document.getElementById("app"), "/",
    createRoutes({ states, actions, update, App }));

  states.map(() => m.redraw());
});
