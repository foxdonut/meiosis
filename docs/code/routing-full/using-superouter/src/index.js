import m from "mithril";
import Stream from "mithril/stream";
import merge from "mergerino";
import { bifold } from "stags";

import { createApp, App } from "./app";
import { router } from "./router";
import { K } from "./util";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

const app = createApp(router.initialRoute);

// run
// app.initial
// app.validate :: state, patch -> Maybe patch
// app.onRouteChange :: state, Maybe patch -> Maybe patch
// map(merge) -> Maybe state
// map(states)
// map(locationBarSync)

let previousState = app.initial;
const update = Stream(app.initial);
const actions = app.Actions(update);
const states = Stream(app.initial);

update
  .map(app.validate(states))
  .map(app.onRouteChange(states))
  .map(
    bifold(K(null), patch => {
      const state = merge(previousState, patch);
      previousState = state;
      states(state);
    })
  )
  .map(() => router.locationBarSync(states().route));

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 15,
  streams: [{ stream: update, label: "update" }, { stream: states, label: "states" }]
});

m.mount(document.getElementById("app"), { view: () => m(App, { state: states(), actions }) });

states.map(() => m.redraw());

router.start({ navigateTo: route => update({ route }) });
