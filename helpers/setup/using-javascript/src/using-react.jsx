// @ts-check
// react + immer + flyd

import meiosis from "../../source/dist/index";
import meiosisReact from "../../react/dist";
import flyd from "flyd";
import produce from "immer";
import React from "react";
import ReactDOM from "react-dom";
import { app, convert } from "./common";

const nest = meiosis.immer.produceNest(produce);

const ConditionsActions = cell => ({
  togglePrecipitations: value => {
    cell.update(state => {
      state.precipitations = value;
    });
  },
  changeSky: value => {
    cell.update(state => {
      state.sky = value;
    });
  }
});

const SkyOption = ({ cell, value, label }) => (
  <label>
    <input
      type="radio"
      value={value}
      checked={cell.getState().sky === value}
      onChange={evt => cell.actions.changeSky(evt.target.value)}
    />
    {label}
  </label>
);

const Conditions = ({ cell }) => (
  <div>
    <label>
      <input
        type="checkbox"
        checked={cell.getState().precipitations}
        onChange={evt => cell.actions.togglePrecipitations(evt.target.checked)}
      />
      Precipitations
    </label>
    <div>
      <SkyOption cell={cell} value="SUNNY" label="Sunny" />
      <SkyOption cell={cell} value="CLOUDY" label="Cloudy" />
      <SkyOption cell={cell} value="MIX" label="Mix of sun/clouds" />
    </div>
  </div>
);

const TemperatureActions = cell => ({
  increment: amount => {
    cell.update(state => {
      state.value += amount;
    });
  },
  changeUnits: () => {
    cell.update(state => {
      const value = state.value;
      const newUnits = state.units === "C" ? "F" : "C";
      const newValue = convert(value, newUnits);
      state.value = newValue;
      state.units = newUnits;
    });
  }
});

const Temperature = ({ cell }) => (
  <div>
    {cell.getState().label} Temperature:
    {cell.getState().value}&deg;{cell.getState().units}
    <div>
      <button onClick={() => cell.actions.increment(1)}>Increment</button>
      <button onClick={() => cell.actions.increment(-1)}>Decrement</button>
    </div>
    <div>
      <button onClick={() => cell.actions.changeUnits()}>Change Units</button>
    </div>
  </div>
);

const Root = ({ cells }) => {
  const result = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <Conditions cell={cells.conditions} />
        <Temperature cell={cells.temperature.air} />
        <Temperature cell={cells.temperature.water} />
      </div>
      <pre style={{ margin: "0" }}>{JSON.stringify(cells.root.getState(), null, 4)}</pre>
    </div>
  );
  return result;
};

const stream = {
  stream: flyd.stream,
  scan: (acc, init, stream) => flyd.scan(acc, init, stream)
};

const cell = meiosis.immer.setupCell({
  stream,
  produce: (s, p) => produce(s, p),
  app
});

const temperatureCell = nest(cell, "temperature");

const cells = {
  root: cell,
  conditions: nest(cell, "conditions", ConditionsActions),
  temperature: {
    air: nest(temperatureCell, "air", TemperatureActions),
    water: nest(temperatureCell, "water", TemperatureActions)
  }
};

const App = meiosisReact({ React, Root });

export const setupReactExample = () => {
  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states: cell.getState, cells }), element);
};
