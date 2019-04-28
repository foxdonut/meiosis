import m from "mithril";
import Stream from "mithril/stream";
import O from "patchinko/constant";
import meiosis from "meiosis-setup";

import { app, App } from "./app";
import { createRoutes } from "./router";

meiosis.patchinko.setup({ stream: Stream, O, app }).then(({ states, actions }) => {
  // Only for using Meiosis Tracer in development.
  require("meiosis-tracer")({
    selector: "#tracer",
    rows: 30,
    streams: [
      // { stream: update, label: "update" },
      { stream: states, label: "states" }
    ]
  });

  m.route(document.getElementById("app"), "/", createRoutes({ states, actions, App }));

  states.map(() => m.redraw());
});
