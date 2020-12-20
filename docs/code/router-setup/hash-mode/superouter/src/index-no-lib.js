import merge from "mergerino";
import m from "mithril";
import stream from "mithril/stream";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { meiosis } from "router-setup-common/src/meiosis";
import { createApp } from "superouter-common/src/app";
import { App } from "./app/view";
import { router } from "./router/index-no-lib";

const app = createApp(router);
const { states, update, actions } = meiosis({ stream, merge, app });

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 30,
  streams: [{ stream: states, label: "states" }]
});

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions, router })
});

router.start(route => update({ route: () => route }));

states.map(() => m.redraw());
