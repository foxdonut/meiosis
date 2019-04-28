import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import O from "patchinko/constant";
import meiosis from "meiosis-setup";

import { app, App } from "./app";
import { router } from "./router";

meiosis.patchinko.setup({ stream: flyd, O, app }).then(({ states, actions }) => {
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

  states.map(router.locationBarSync);

  router.start({ navigateTo: actions.navigateTo });
});
