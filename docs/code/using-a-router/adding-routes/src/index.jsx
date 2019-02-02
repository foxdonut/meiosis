import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";
import { listenToRouteChanges } from "./util/router";

const update = flyd.stream();

Promise.resolve().then(() => app.initialState()).then(initialState => {
  const models = flyd.scan(P, initialState, update);
  const states = models.map(state =>
    app.computed.reduce((x, f) => P(x, f(x)), state)
  );

  // Only for using Meiosis Tracer in development.
  require("meiosis-tracer")({
    selector: "#tracer",
    rows: 10,
    streams: [
      { stream: models, label: "models" },
      { stream: states, label: "states" }
    ]
  });

  const actions = app.actions(update);
  render(<App states={states} actions={actions}/>, document.getElementById("app"));

  app.services.forEach(service => service(states, update));

  listenToRouteChanges(update);
});
