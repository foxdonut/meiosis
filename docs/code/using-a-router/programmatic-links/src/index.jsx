import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import O from "patchinko/constant";
import meiosis from "meiosis-helpers";

import { app, App } from "./app";
import { Route } from "routing-common/src/routes";
import { routeConfig } from "./router";
import { createRouter } from "./router/util";

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

  const router = createRouter({
    routeConfig,
    navigateTo: actions.navigateTo,
    defaultRoute: [Route.Home()]
  });

  render(<App states={states} actions={actions} router={router} />, document.getElementById("app"));

  states.map(router.locationBarSync);
});
