import m from "mithril";
import Stream from "mithril/stream";
import merge from "mergerino";
import { getOr, map, run } from "stags";

import { createApp, App } from "./app";
import { router } from "./router";
import { Route } from "./routes";
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
  run(
    { state, patch },
    app.validate,
    app.onRouteChange,
    map(patch => merge(state, patch)),
    map(tap(states))
  );

let state = run(fn({}, app.initial), getOr({ route: Route.of.Home() }));
if (!states()) {
  states(state);
}

// update
update.map(patch =>
  run(
    fn(state, patch),
    map(updatedState => {
      state = updatedState;
    })
  )
);

const actions = app.Actions(update);
m.mount(document.getElementById("app"), { view: () => m(App, { state: states(), actions }) });

states.map(() => m.redraw());
update.map(() => router.locationBarSync(states().route));
router.start({ navigateTo: route => update({ route }) });
