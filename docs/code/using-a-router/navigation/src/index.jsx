import React from "react";
import { render } from "react-dom";
import simpleStream from "meiosis-setup/simple-stream";
import O from "patchinko/constant";
import meiosisPatchinko from "meiosis-setup/patchinko";

import { createApp, App } from "./app";
import { Route } from "routing-common/src/routes";

const app = createApp();

meiosisPatchinko({ stream: simpleStream, O, app }).then(({ states, actions }) => {
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

  // Initial navigation
  actions.navigateTo([Route.Home()]);
});
