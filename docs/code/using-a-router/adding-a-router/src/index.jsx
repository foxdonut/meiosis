import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import O from "patchinko/constant";
import meiosis from "meiosis-setup";

import { createApp, App } from "./app";
import { router } from "./router";

const app = createApp(router.initialRoute, router.locationBarSync);

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

  router.start({ navigateTo: actions.navigateTo });
});
