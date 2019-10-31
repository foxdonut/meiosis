import * as React from "react";
import { render } from "react-dom";
import simpleStream from "meiosis-setup/simple-stream";
import merge from "mergerino";
import meiosisReact from "meiosis-setup/react";
import meiosisMergerino from "meiosis-setup/mergerino";
import * as meiosisTracer from "meiosis-tracer";

import { createApp } from "./app";
import { Root } from "./root";
import { router } from "./router";

const App = meiosisReact({ React, Root });
const app = createApp(router.initialRoute);

meiosisMergerino({ stream: simpleStream, merge, app }).then(({ states, actions }) => {
  // Only for using Meiosis Tracer in development.
  meiosisTracer({
    selector: "#tracer",
    rows: 30,
    streams: [
      // { stream: update, label: "update" },
      { stream: states, label: "states" }
    ]
  });

  render(<App states={states} actions={actions} />, document.getElementById("app"));

  router.start({ navigateTo: actions.navigateTo });
  states.map(state => router.locationBarSync(state.route));
});
