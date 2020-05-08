import merge from "mergerino";
import m from "mithril";
import stream from "mithril/stream";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { meiosis } from "./util";
import { createApp, App } from "./app";
import { router } from "./router";

const app = createApp();
const { states, update, actions } = meiosis({ stream, merge, app });

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 30,
  streams: [{ stream: states, label: "states" }]
});

m.route(
  document.getElementById("app"),
  "/",
  router.createMithrilRoutes({
    App,
    navigateTo: route => update({ route: () => route }),
    states,
    actions
  })
);

states.map(state => {
  m.redraw();
  router.locationBarSync(state.route.url);
});
