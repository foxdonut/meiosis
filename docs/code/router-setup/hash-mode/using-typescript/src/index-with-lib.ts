import merge from "mergerino";
import m from "mithril";
import Stream from "mithril/stream";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { meiosis } from "./meiosis";
import { createApp, App } from "./app";
import { State, Patch, AppActions } from "./app/types";
import { router } from "./router/index-with-lib";

const app = createApp(router);
const { states, update, actions } = meiosis<State, Patch, AppActions>({
  stream: Stream,
  accumulator: merge,
  app
});

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 30,
  streams: [{ stream: states, label: "states" }]
});

m.mount(document.getElementById("app") as Element, {
  view: () => m(App, { state: states(), update, actions, router })
});

router.start(route => update({ route: () => route }));

states.map(() => m.redraw());
