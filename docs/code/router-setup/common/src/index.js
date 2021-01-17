import merge from "mergerino";
import m from "mithril";
import flyd from "flyd";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { meiosis } from "./meiosis";
import { createApp, App } from "./app";

export const setupApp = router => {
  const app = createApp(router);
  const { states, update, actions } = meiosis({ stream: flyd, merge, app });

  router.start(route => update({ route: () => route }));
  states.map(state => router.syncLocationBar(state.route));

  // Only for using Meiosis Tracer in development.
  meiosisTracer({
    selector: "#tracer",
    rows: 30,
    streams: [{ stream: states, label: "states" }]
  });

  m.mount(document.getElementById("app"), {
    view: () => m(App, { state: states(), actions, router })
  });

  states.map(() => m.redraw());
};
