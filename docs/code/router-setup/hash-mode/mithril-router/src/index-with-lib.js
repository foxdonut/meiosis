import merge from "mergerino";
import m from "mithril";
import stream from "mithril/stream";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { meiosis } from "router-setup-common/src/meiosis";
import { createApp, App } from "router-setup-common/src/app";
import { router } from "./router/index-with-lib";

const app = createApp(router);
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
    onRouteChange: route => update({ route: () => route }),
    render: () => m(App, { state: states(), update, actions, router })
  })
);

states.map(() => m.redraw());
