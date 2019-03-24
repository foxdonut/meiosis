import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";
import { Route } from "routing-common/src/root";

const update = flyd.stream();

Promise.resolve().then(app.initialState).then(initialState => {
  const models = flyd.scan(P, initialState, update);
  const actions = app.actions(update);

  const computed = models.map(state =>
    app.computed.reduce((x, f) => P(x, f(x)), state)
  );
  computed.map(state => app.services.map(service => service(state, update)));

  const states = flyd.stream();
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

  render(<App states={states} actions={actions}/>, document.getElementById("app"));

  // Initial navigation
  actions.navigateTo([ Route.Home() ]);
});
