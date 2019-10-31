import m from "mithril";
import Stream from "mithril/stream";
import merge from "mergerino";
import meiosisMergerino from "meiosis-setup/mergerino";

import { createApp, App } from "./app";
import { router } from "./router";

const app = createApp(router.initialRoute);

meiosisMergerino({ stream: Stream, merge, app }).then(({ states, update, actions }) => {
  // Only for using Meiosis Tracer in development.
  require("meiosis-tracer")({
    selector: "#tracer",
    rows: 10,
    streams: [{ stream: update, label: "update" }, { stream: states, label: "states" }]
  });

  m.route(document.getElementById("app"), "/", router.MithrilRoutes({ states, actions, App }));

  states.map(() => m.redraw());
  states.map(state => router.locationBarSync(state.route));
});
