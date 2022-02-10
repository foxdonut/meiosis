// react + immer + flyd
import { App, Meiosis, setup } from "../../source/dist/immer";
import meiosisReact from "../../react/dist";
import flyd from "flyd";
import produce from "immer";
import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import {
  Conditions,
  ConditionsComponent,
  InitialTemperature,
  Sky,
  State,
  Temperature,
  TemperatureComponent,
  convert,
  initialConditions
} from "./common";

interface Attrs {
  cell: Meiosis<State>;
}

interface ConditionsActions {
  togglePrecipitations: (cell: Meiosis<Conditions>, value: boolean) => void;
  changeSky: (cell: Meiosis<Conditions>, value: Sky) => void;
}

interface ConditionsAttrs {
  cell: Meiosis<Conditions>;
}

interface SkyOptionAttrs extends ConditionsAttrs {
  value: string;
  label: string;
}

interface TemperatureActions {
  increment: (cell: Meiosis<Temperature>, amount: number) => void;
  changeUnits: (cell: Meiosis<Temperature>) => void;
}

interface TemperatureAttrs {
  cell: Meiosis<Temperature>;
}

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const conditionsActions: ConditionsActions = {
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

const SkyOption: (attrs: SkyOptionAttrs) => ReactElement = ({ cell, value, label }) => (
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

const Conditions: (attrs: ConditionsAttrs) => ReactElement = ({ cell }) => (
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

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const temperatureActions: TemperatureActions = {
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

const Temperature: (attrs: TemperatureAttrs) => ReactElement = ({ cell }) => (
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

const app: App<State> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const Root: (attrs: Attrs) => ReactElement = ({ cell }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
    <div>
      <Conditions cell={cell.nest("conditions")} />
      <Temperature cell={cell.nest("temperature").nest("air")} />
      <Temperature cell={cell.nest("temperature").nest("water")} />
    </div>
    <pre style={{ margin: "0" }}>{JSON.stringify(cell.getState(), null, 4)}</pre>
  </div>
);

const stream = {
  stream: (value?: any) => flyd.stream(value),
  scan: (acc: any, init: any, stream: any) => flyd.scan(acc, init, stream)
};

const cell = setup<State>({ stream, produce: (s, p) => produce(s, p), app });
const App = meiosisReact<Attrs>({ React, Root });

export const setupReactExample = (): void => {
  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states: cell.getState, cell }), element);
};
