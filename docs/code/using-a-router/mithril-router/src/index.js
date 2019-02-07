import m from "mithril";
import stream from "mithril/stream";
import { P } from "patchinko/explicit";

import { app, App } from "./app";
import { createRoutes } from "./util/router";

const update = stream();

Promise.resolve().then(app.initialState).then(initialState => {
  const models = stream.scan(P, initialState, update);
  const actions = app.actions(update);

  const computed = models.map(state =>
    app.computed.reduce((x, f) => P(x, f(x)), state)
  );
  app.services.forEach(service => service(computed, update));

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

  m.route(document.getElementById("app"), "/",
    createRoutes({ states, actions, update, App }));

  states.map(() => m.redraw());
});
