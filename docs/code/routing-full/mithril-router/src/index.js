import m from "mithril";
import Stream from "mithril/stream";
import merge from "mergerino";
import meiosis from "meiosis-setup/mergerino";

import { createApp, App } from "./app";
import { router } from "./router";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

const app = createApp(router.initialRoute);

const { states, actions } = meiosis({ stream: Stream, merge, app });

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 30,
  streams: [{ stream: states, label: "states" }]
});

m.route(document.getElementById("app"), "/", router.MithrilRoutes({ states, actions, App }));

states.map(() => m.redraw());
states.map(state => router.locationBarSync(state.route));
