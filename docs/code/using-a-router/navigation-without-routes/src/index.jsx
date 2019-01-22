import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";
import { T, pipe } from "./util";
import { getPath, parsePath } from "./util/router";

const update = flyd.stream();
const states = flyd.stream();

Promise.resolve().then(() => app.initialState()).then(initialState => {
  const models = flyd.scan(P, initialState, update);

  // Only for using Meiosis Tracer in development.
  require("meiosis-tracer")({
    selector: "#tracer",
    rows: 10,
    streams: [
      { stream: models, label: "models" },
      { stream: states, label: "states" }
    ]
  });

  models.map(state => {
    app.services.forEach(service =>
      service({ state: P({ fresh: true }, state), update })
    );
    states(models());
  });

  const actions = app.actions({ update });
  render(<App states={states} actions={actions}/>, document.getElementById("app"));

  // This is the equivalent to listening for route changes,
  // window.onpopstate = () => navigate(routing.parseUrl())
  // FIXME: this should go somewhere else
  document.getElementById("pathButton").addEventListener("click", () => {
    T(getPath(), pipe(parsePath, route => ({ route }), update));
  });
});
