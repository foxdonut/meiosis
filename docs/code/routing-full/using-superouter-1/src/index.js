import m from "mithril";
import Stream from "mithril/stream";
import { assoc } from "ramda";
import { run } from "stags";

import { createApp, App } from "./app";
import { router } from "./router";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

const app = createApp(router.initialRoute);

const update = Stream();

const service = context =>
  app.services.reduce(
    (result, service) => ({
      state: run(result.state, service(result)),
      previousState: context.previousState
    }),
    context
  ).state;

const states = Stream.scan(
  (state, patch) => service({ previousState: state, state: patch(state) }),
  service({ previousState: {}, state: app.initial }),
  update
);

// Only for using Meiosis Tracer in development.
meiosisTracer({
  selector: "#tracer",
  rows: 30,
  streams: [{ stream: states, label: "states" }]
});

const actions = app.Actions(update);
m.mount(document.getElementById("app"), { view: () => m(App, { state: states(), actions }) });

states.map(state => {
  m.redraw();
  router.locationBarSync(state.route);
  app.next.forEach(fn => fn({ state, update }));
});

router.start({ navigateTo: route => update(assoc("route", route)) });
