import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";

const update = flyd.stream();
const navigate = flyd.stream();
const states = flyd.scan(P, app.initialState(), update);
states.map(app.service);

// Only for using Meiosis Tracer in development.
require("meiosis-tracer")(
  { selector: "#tracer",
    rows: 10,
    streams: [ navigate, states ]
  }
);

const actions = app.actions(update, navigate);
render(<App states={states} actions={actions}/>, document.getElementById("app"));

navigate.map(update);

// Listen to route changes
window.onpopstate = () =>
  navigate({ route: app.routing.parseUrl(document.location.hash.substring(1) || "/") });
