// @ts-check

import React from "react";
import { render } from "react-dom";
import simpleStream from "meiosis-setup/simple-stream";
import merge from "mergerino";
import meiosisReact from "meiosis-setup/react";
import meiosis from "meiosis-setup/mergerino";

import { createApp } from "./app";
import { Root } from "./root";
import { Route } from "routing-common/src/routes";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

const App = meiosisReact({ React, Root });
const app = createApp([Route.Home()]);

const { states, actions } = meiosis({ stream: simpleStream, merge, app });

// Only for using Meiosis Tracer in development.
const viewStates = states.map(state => state);

meiosisTracer({
  selector: "#tracer",
  rows: 30,
  streams: [
    // { stream: update, label: "update" },
    { stream: viewStates, label: "states" }
  ]
});

render(<App states={viewStates} actions={actions} />, document.getElementById("app"));
