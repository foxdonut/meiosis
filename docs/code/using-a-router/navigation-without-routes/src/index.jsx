import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";

const update = flyd.stream();
const navigate = flyd.stream();

const interimStates = flyd.scan(P, app.initialState(), update);
const states = interimStates.map(app.service);

// Only for using Meiosis Tracer in development.
require("meiosis-tracer")({ selector: "#tracer", rows: 10, streams: [ navigate, interimStates, states ]});

const actions = app.actions({ update, navigate });
render(<App states={states} actions={actions}/>, document.getElementById("app"));

/*
navigate.map(navigation => {
  const state = states();
  const validatedNavigation = app.validateNavigation({ state, navigation });
  app.onNavigateTo({ state, navigation: validatedNavigation }).then(update);
});
*/
flyd.scan((previous, navigation) => {
  const state = states();
  const validatedNavigation = app.validateNavigation({ state, navigation });

  Promise.all([
    app.onNavigateAway({ state, navigation: previous }),
    app.onNavigateTo({ state, navigation: validatedNavigation })
  ]).then(values => update(Object.assign.apply(null, values)));

  app.postNavigate({ state, navigation: validatedNavigation, update });

  return validatedNavigation;
}, { route: { id: null } }, navigate);

document.getElementById("pathButton").addEventListener("click", () => {
  console.log("go");
});
