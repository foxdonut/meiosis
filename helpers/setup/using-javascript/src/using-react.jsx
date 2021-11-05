// @ts-check

import meiosis from "../../source/dist/index";
import flyd from "flyd";
import produce from "immer";
import React from "react";
import ReactDOM from "react-dom";
import meiosisReact from "../../react/dist";
import { app, convert } from "./common";

// react + immer + flyd
const nest = meiosis.immer.nest(produce);

const conditionsActions = {
  togglePrecipitations: (context, value) => {
    context.update(state => {
      state.precipitations = value;
    });
  },
  changeSky: (context, value) => {
    context.update(state => {
      state.sky = value;
    });
  }
};

const SkyOption = ({ context, value, label }) => (
  <label>
    <input
      type="radio"
      value={value}
      checked={context.getState().sky === value}
      onChange={evt => conditionsActions.changeSky(context, evt.target.value)}
    />
    {label}
  </label>
);

const Conditions = ({ context }) => (
  <div>
    <label>
      <input
        type="checkbox"
        checked={context.getState().precipitations}
        onChange={evt => conditionsActions.togglePrecipitations(context, evt.target.checked)}
      />
      Precipitations
    </label>
    <div>
      <SkyOption context={context} value="SUNNY" label="Sunny" />
      <SkyOption context={context} value="CLOUDY" label="Cloudy" />
      <SkyOption context={context} value="MIX" label="Mix of sun/clouds" />
    </div>
  </div>
);

const temperatureActions = {
  increment: (context, amount) => {
    context.update(state => {
      state.value += amount;
    });
  },
  changeUnits: context => {
    context.update(state => {
      const value = state.value;
      const newUnits = state.units === "C" ? "F" : "C";
      const newValue = convert(value, newUnits);
      state.value = newValue;
      state.units = newUnits;
    });
  }
};

const Temperature = ({ context }) => (
  <div>
    {context.getState().label} Temperature:
    {context.getState().value}&deg;{context.getState().units}
    <div>
      <button onClick={() => temperatureActions.increment(context, 1)}>Increment</button>
      <button onClick={() => temperatureActions.increment(context, -1)}>Decrement</button>
    </div>
    <div>
      <button onClick={() => temperatureActions.changeUnits(context)}>Change Units</button>
    </div>
  </div>
);

const Root = ({ context }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
    <div>
      <Conditions context={nest(context, "conditions")} />
      <Temperature context={nest(nest(context, "temperature"), "air")} />
      <Temperature context={nest(nest(context, "temperature"), "water")} />
    </div>
    <pre style={{ margin: "0" }}>{JSON.stringify(context.getState(), null, 4)}</pre>
  </div>
);

const stream = {
  stream: flyd.stream,
  scan: (acc, init, stream) => flyd.scan(acc, init, stream)
};

const context = meiosis.immer.meiosisOne({
  stream,
  produce: (s, p) => produce(s, p),
  app
});

const App = meiosisReact({ React, Root });

export const setupReactExample = () => {
  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states: context.getState, context }), element);
};
