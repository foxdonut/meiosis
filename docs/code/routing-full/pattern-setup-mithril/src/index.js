import meiosis from "meiosis-setup/mergerino";
import simpleStream from "meiosis-setup/simple-stream";
import merge from "mergerino";
import m from "mithril";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { createApp, App } from "./app";
import { router } from "./router";

const app = createApp(router.initialRoute);
const { states, update, actions } = meiosis({ stream: simpleStream, merge, app });

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
