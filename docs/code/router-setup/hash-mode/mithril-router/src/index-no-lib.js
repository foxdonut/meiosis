import merge from "mergerino";
import m from "mithril";
import stream from "mithril/stream";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { meiosis } from "router-setup-common/src/meiosis";
import { createApp, App } from "./app";
import { router } from "./router/index-no-lib";
import { syncLocationBar } from "router-setup-common/src/locationBar";

const app = createApp();
const { states, update, actions } = meiosis({ stream, merge, app });

states.map(syncLocationBar(router));

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
    onRouteChange: route => update({ route: () => route }),
    states,
    update,
    actions,
    router
  })
);

states.map(() => m.redraw());
