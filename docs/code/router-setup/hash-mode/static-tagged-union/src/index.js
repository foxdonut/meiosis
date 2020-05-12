import merge from "mergerino";
import m from "mithril";
import stream from "mithril/stream";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { meiosis } from "./meiosis";
import { createApp, App } from "./app";
import { router } from "./router";

const app = createApp(router.initialRoute);
const { states, update, actions } = meiosis({ stream, merge, app });

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 30,
  streams: [{ stream: states, label: "states" }]
});

m.mount(document.getElementById("app"), { view: () => m(App, { state: states(), actions }) });

router.start({ navigateTo: route => update({ route: () => route }) });

states.map(() => m.redraw());
