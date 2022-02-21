// @ts-check
// react + immer + flyd

import meiosis from "../../source/dist/index";
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
      checked={cell.state.sky === value}
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
        checked={cell.state.precipitations}
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
    {cell.state.label} Temperature:
    {cell.state.value}&deg;{cell.state.units}
    <div>
      <button onClick={() => temperatureActions.increment(cell, 1)}>Increment</button>
      <button onClick={() => temperatureActions.increment(cell, -1)}>Decrement</button>
    </div>
    <div>
      <button onClick={() => temperatureActions.changeUnits(cell)}>Change Units</button>
    </div>
  </div>
);

/** @type {import("react").FunctionComponent} */
const App = ({ cell }) => {
  /** @type {import("react").ReactElement} */
  /// @ts-ignore
  const result = (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <Conditions cell={cell.nest("conditions")} />
        <Temperature cell={cell.nest("temperature").nest("air")} />
        <Temperature cell={cell.nest("temperature").nest("water")} />
      </div>
      <pre style={{ margin: "0" }}>{JSON.stringify(cell.state, null, 4)}</pre>
    </div>
  );
  return result;
};

export const setupReactExample = () => {
  const Root = ({ states, getCell }) => {
    const [init, setInit] = React.useState(false);
    const [, setState] = React.useState(states());

    if (!init) {
      setInit(true);
      states.map(setState);
    }

    return React.createElement(App, { cell: getCell() });
  };

  const { states, getCell } = meiosis.immer.setup({
    stream: meiosis.common.toStream(flyd),
    produce: (s, p) => produce(s, p),
    app
  });
  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(Root, { states, getCell }), element);
};
