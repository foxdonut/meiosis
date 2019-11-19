import m from "mithril";
import Stream from "mithril/stream";
import merge from "mergerino";
import { run } from "stags";

import { createApp, App } from "./app";
import { router } from "./router";
import { tap } from "./util";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

const app = createApp(router.initialRoute);

const states = Stream();
const update = Stream();

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 10,
  streams: [{ stream: update, label: "update" }, { stream: states, label: "states" }]
});

const fn = (state, patch) =>
  run({ state, patch }, app.validate, app.onRouteChange, patch => merge(state, patch), tap(states));

let state = fn({}, app.initial);

// update
update.map(patch =>
  run(fn(state, patch), updatedState => {
    state = updatedState;
  })
);

const actions = app.Actions(update);
m.mount(document.getElementById("app"), { view: () => m(App, { state: states(), actions }) });

states.map(() => {
  m.redraw();
  router.locationBarSync(states().route);
});

router.start({ navigateTo: route => update({ route }) });
