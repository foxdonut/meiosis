import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";
import { T, getNavigation, getPath, parsePath, pipe } from "./util";

const update = flyd.stream();
const navigate = flyd.stream();

Promise.resolve().then(() => app.initialState().then(initialState => {
  const states0 = flyd.scan(P, initialState, update);
  const states = states0.map(app.service);

  // Only for using Meiosis Tracer in development.
  require("meiosis-tracer")({
    selector: "#tracer",
    rows: 10,
    streams: [ navigate, states0, states ]
  });

  const actions = app.actions({ update, navigate });
  render(<App states={states} actions={actions}/>, document.getElementById("app"));

  flyd.scan((previous, navigation) => {
    const state = states();
    const nextNavigation = app.onNavigate({ state, navigation, previous });
    update(Object.assign({}, previous, nextNavigation));
    return nextNavigation;
  }, { route: { id: null } }, navigate);

  // This is the equivalent to listening for route changes,
  // window.onpopstate = () => navigate(routing.parseUrl())
  document.getElementById("pathButton").addEventListener("click", () => {
    T(getPath(), pipe(parsePath, getNavigation, navigate));
  });
});
