import React from "react";
import { render } from "react-dom";
import simpleStream from "meiosis-setup/simple-stream";
import merge from "mergerino";
import meiosisReact from "meiosis-setup/react";
import meiosisMergerino from "meiosis-setup/mergerino";

import { createApp } from "./app";
import { Root } from "./root";
import { Route } from "routing-common/src/routes";

const App = meiosisReact({ React, Root });
const app = createApp([Route.Home()]);

meiosisMergerino({ stream: simpleStream, merge, app }).then(({ states, actions }) => {
  // Only for using Meiosis Tracer in development.
  require("meiosis-tracer")({
    selector: "#tracer",
    rows: 30,
    streams: [
      // { stream: update, label: "update" },
      { stream: states, label: "states" }
    ]
  });

  render(<App states={states} actions={actions} />, document.getElementById("app"));
});
