import m from "mithril";
import Stream from "mithril/stream";
import merge from "mergerino";

import { createApp, App } from "./app";
import { router } from "./router";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

const app = createApp(router.initialRoute);

const update = Stream();
const states = Stream.scan(merge, app.initial, update);
const actions = app.Actions(update);

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 10,
  streams: [{ stream: update, label: "update" }, { stream: states, label: "states" }]
});

m.route(document.getElementById("app"), "/", router.MithrilRoutes({ states, actions, App }));

states.map(() => m.redraw());
states.map(state => router.locationBarSync(state.route));
