import merge from "mergerino";
import m from "mithril";
import stream from "mithril/stream";

// Only for using Meiosis Tracer in development.
import meiosisTracer from "meiosis-tracer";

import { meiosis } from "router-setup-common/src/meiosis";
import { syncLocationBar } from "router-setup-common/src/locationBar";
import { createApp, App } from "./app";

export const setupApp = router => {
  const app = createApp(router);
  const { states, update, actions } = meiosis({ stream, merge, app });

  router.start(route => update({ route: () => route }));
  states.map(syncLocationBar(router));

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
