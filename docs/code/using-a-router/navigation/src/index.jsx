import React from "react";
import { render } from "react-dom";
import flyd from "flyd";
import O from "patchinko/constant";

import { app, App } from "./app";
import { Route } from "routing-common/src/routes";

const update = flyd.stream();

Promise.resolve()
  .then(app.initialState)
  .then(initialState => {
    const models = flyd.scan(O, initialState, update);

    const accept = models.map(state => app.accept.reduce((x, f) => O(x, f(x)), state));

    const computed = accept.map(state => app.computed.reduce((x, f) => O(x, f(x)), state));

    computed.map(state => app.services.map(service => service(state, update)));

    const states = flyd.stream();
    computed.map(states);

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
    render(<App states={states} actions={actions} />, document.getElementById("app"));

    // Initial navigation
    actions.navigateTo([Route.Home()]);
  });
