// @ts-check
// react + immer + flyd

import meiosis from "../../source/dist/index";
import meiosisReact from "../../react/dist";
import flyd from "flyd";
import produce from "immer";
import React from "react";
import ReactDOM from "react-dom";
import { app, convert } from "./common";

const conditionsActions = {
  togglePrecipitations: (cell, value) => {
    cell.update(state => {
      state.precipitations = value;
    });
  },
  changeSky: (cell, value) => {
    cell.update(state => {
      state.sky = value;
    });
  }
};

const SkyOption = ({ cell, value, label }) => (
  <label>
    <input
      type="radio"
      value={value}
      checked={cell.getState().sky === value}
      onChange={evt => conditionsActions.changeSky(cell, evt.target.value)}
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
        onChange={evt => conditionsActions.togglePrecipitations(cell, evt.target.checked)}
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

const temperatureActions = {
  increment: (cell, amount) => {
    cell.update(state => {
      state.value += amount;
    });
  },
  changeUnits: cell => {
    cell.update(state => {
      const value = state.value;
      const newUnits = state.units === "C" ? "F" : "C";
      const newValue = convert(value, newUnits);
      state.value = newValue;
      state.units = newUnits;
    });
  }
};

const Temperature = ({ cell }) => (
  <div>
    {cell.getState().label} Temperature:
    {cell.getState().value}&deg;{cell.getState().units}
    <div>
      <button onClick={() => temperatureActions.increment(cell, 1)}>Increment</button>
      <button onClick={() => temperatureActions.increment(cell, -1)}>Decrement</button>
    </div>
    <div>
      <button onClick={() => temperatureActions.changeUnits(cell)}>Change Units</button>
    </div>
  </div>
);

const Root = ({ cells }) => {
  /** @type {import("react").ReactElement} */
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

const cell = meiosis.immer.setup({
  stream,
  produce: (s, p) => produce(s, p),
  app
});

const temperatureCell = cell.nest("temperature");

const cells = {
  root: cell,
  conditions: cell.nest("conditions"),
  temperature: {
    air: temperatureCell.nest("air"),
    water: temperatureCell.nest("water")
  }
};

const App = meiosisReact({ React, Root });

export const setupReactExample = () => {
  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states: cell.getState, cells }), element);
};
