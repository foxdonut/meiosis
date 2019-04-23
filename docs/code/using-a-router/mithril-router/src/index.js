import m from "mithril";
import stream from "mithril/stream";
import O from "patchinko/constant";

import { app, App } from "./app";
import { createRoutes } from "./router";

const update = stream();

Promise.resolve()
  .then(app.initialState)
  .then(initialState => {
    const models = stream.scan(O, initialState, update);
    const accept = models.map(state => app.accept.reduce((x, f) => O(x, f(x)), state));
    const states = stream();

    let buffered = false,
      buffer = [];

    const bufferedUpdate = patch => {
      if (buffered) {
        buffer.push(patch);
      } else {
        update(patch);
      }
    };

    accept.map(state => {
      // For synchronous updates, prevent re-calling all services,
      // and only issue a state change when services have finished.
      if (!buffered) {
        buffered = true;
        buffer = [];
        app.services.map(service => service(state, bufferedUpdate));

        // Updates are buffered so that every service works on the same state
        // instead of on a state that was changed by a previous service.
        if (buffer.length > 0) {
          buffer.forEach(update);
        }

        buffered = false;
        states(state);
      }
    });

    // Only for using Meiosis Tracer in development.
    require("meiosis-tracer")({
      selector: "#tracer",
      rows: 30,
      streams: [
        // { stream: update, label: "update" },
        { stream: states, label: "states" }
      ]
    });

    const actions = app.actions(update);
    m.route(document.getElementById("app"), "/", createRoutes({ states, actions, App }));

    states.map(() => m.redraw());
  });
