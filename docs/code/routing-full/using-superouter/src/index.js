import m from "mithril";
import Stream from "mithril/stream";
import { assoc, prop, tap } from "ramda";
import { run } from "stags";

import { createApp, App } from "./app";
import { router } from "./router";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

const app = createApp(router.initialRoute);

const states = Stream();
const update = Stream();

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 30,
  streams: [{ stream: states, label: "states" }]
});

const services = [app.validate, app.onRouteChange];
const service = context =>
  services.reduce(
    (result, service) => ({
      state: run(result.state, service(result)),
      previousState: context.previousState
    }),
    context
  );

const fn = context => run(context, service, prop("state"), tap(states));

let state = fn({ state: app.initial, previousState: {} });

// update
update.map(patch =>
  run(fn({ previousState: state, state: patch(state) }), updatedState => {
    state = updatedState;
  })
);

const actions = app.Actions(update);
m.mount(document.getElementById("app"), { view: () => m(App, { state: states(), actions }) });

states.map(() => {
  m.redraw();
  router.locationBarSync(states().route);
});

router.start({ navigateTo: route => update(assoc("route", route)) });
