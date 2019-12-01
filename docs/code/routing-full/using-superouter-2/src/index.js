// import m from "mithril";
// import { h } from "seview/mithril";
// import { render } from "preact";
// import { h } from "seview/preact";
import { createElement } from "react";
import { render } from "react-dom";

import Stream from "mithril/stream";
import merge from "mergerino";

import { createApp, App } from "./app";
import { router } from "./router";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

const app = createApp(router.initialRoute);

const update = Stream();

const service = context =>
  app.services.reduce(
    (result, service) => ({
      state: merge(result.state, service(result)),
      previousState: context.previousState
    }),
    context
  ).state;

const states = Stream.scan(
  (state, patch) => service({ previousState: state, state: merge(state, patch) }),
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

// m.mount(document.getElementById("app"), { view: () => h(App({ state: states(), actions })) });

// render(h(App({ initial: states(), states, actions })), document.getElementById("app"));
render(createElement(App, { initial: states(), states, actions }), document.getElementById("app"));

states.map(state => {
  // m.redraw();
  router.locationBarSync(state.route);
  app.next.forEach(fn => fn({ state, update }));
});

router.start({ navigateTo: route => update({ route }) });
