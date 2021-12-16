import meiosis, { ImmerCellActionConstructor, ImmerApp, ImmerCell } from "../../source/dist";
import meiosisReact from "../../react/dist";
import flyd from "flyd";
import produce from "immer";
import React, { ReactElement } from "react";
import ReactDOM from "react-dom";
import {
  Conditions,
  ConditionsActions,
  ConditionsComponent,
  InitialTemperature,
  State,
  Temperature,
  TemperatureActions,
  TemperatureComponent,
  convert,
  initialConditions
} from "./common";

// react + immer + flyd
interface Attrs {
  cell: ImmerCell<State>;
}

interface ConditionsAttrs {
  cell: ImmerCell<Conditions, ConditionsActions>;
}

interface SkyOptionAttrs extends ConditionsAttrs {
  value: string;
  label: string;
}

interface TemperatureAttrs {
  cell: ImmerCell<Temperature, TemperatureActions>;
}

const nest = meiosis.immer.produceNest(produce);

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const ConditionsActionsConstr: ImmerCellActionConstructor<
  Conditions,
  ConditionsActions
> = cell => ({
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

const SkyOption: (attrs: SkyOptionAttrs) => ReactElement = ({ cell, value, label }) => (
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

const Conditions: (attrs: ConditionsAttrs) => ReactElement = ({ cell }) => (
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

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const TemperatureActionsConstr: ImmerCellActionConstructor<
  Temperature,
  TemperatureActions
> = cell => ({
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

const Temperature: (attrs: TemperatureAttrs) => ReactElement = ({ cell }) => (
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

const app: ImmerApp<State, never> = {
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
      <Conditions cell={nest(cell, "conditions", ConditionsActionsConstr)} />
      <Temperature cell={nest(nest(cell, "temperature"), "air", TemperatureActionsConstr)} />
      <Temperature cell={nest(nest(cell, "temperature"), "water", TemperatureActionsConstr)} />
    </div>
    <pre style={{ margin: "0" }}>{JSON.stringify(cell.getState(), null, 4)}</pre>
  </div>
);

const stream = {
  stream: (value?: any) => flyd.stream(value),
  scan: (acc: any, init: any, stream: any) => flyd.scan(acc, init, stream)
};

const cell = meiosis.immer.cell<State, never>({
  stream,
  produce: (s, p) => produce(s, p),
  app
});

const App = meiosisReact<Attrs>({ React, Root });

export const setupReactExample = (): void => {
  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states: cell.getState, cell }), element);
};
