import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";

const update = flyd.stream();
const navigate = flyd.stream();

const states = flyd.scan(P, app.initialState(), update);

// Only for using Meiosis Tracer in development.
require("meiosis-tracer")({ selector: "#tracer", rows: 25, streams: [ states ]});

const actions = app.actions({ update, navigate });
render(<App states={states} actions={actions}/>, document.getElementById("app"));

navigate.map(navigation => {
  const state = states();
  const validatedNavigation = app.validateNavigation({ state, navigation });
  app.onNavigate({ state, navigation: validatedNavigation }).then(update);
});

// This is external to the app and is meant to simulate the browser's location bar.
const getPath = () => document.getElementById("pathInput").value;
const setPath = path => document.getElementById("pathInput").value = path;

document.getElementById("pathButton").addEventListener("click", () => {
  console.log("go");
});
