import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";
import { T, getNavigation, getPath, parsePath, pipe } from "./util";

const update = flyd.stream();
const navigate = flyd.stream();

Promise.resolve().then(() => app.initialState({ update, navigate })).then(initialState => {
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
    const validatedNavigation = app.navigation.validate({ state, navigation });

    Promise.all([
      app.navigation.leave({ state, navigation: previous }),
      app.navigation.before({ state, navigation: validatedNavigation })
    ]).then(values => update(Object.assign.apply(null, values)));

    app.navigation.after({ state, navigation: validatedNavigation, update });

    return validatedNavigation;
  }, { route: { id: null } }, navigate);

  // This is the equivalent to listening for route changes,
  // window.onpopstate = () => navigate(routing.parseUrl())
  document.getElementById("pathButton").addEventListener("click", () => {
    T(getPath(), pipe(parsePath, getNavigation, navigate));
  });
});
