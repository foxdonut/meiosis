import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import { P } from "patchinko/explicit";

import { app, App } from "./app";

const update = flyd.stream();
const states = flyd.scan(P, app.initialState(), update);

// Only for using Meiosis Tracer in development.
require("meiosis-tracer")({ selector: "#tracer", rows: 25, streams: [ states ]});

const actions = app.actions(update);
render(<App states={states} actions={actions}/>, document.getElementById("app"));

// This is external to the app and is meant to simulate the browser's location bar.
const getPath = () => document.getElementById("pathInput").value;
const setPath = path => document.getElementById("pathInput").value = path;

document.getElementById("pathButton").addEventListener("click", () => {
  console.log("go");
});
