// react + immer + flyd
import { toStream } from "../../source/dist/common";
import { App, MeiosisCell, setup } from "../../source/dist/functionPatches";
import flyd from "flyd";
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
  cell: MeiosisCell<State>;
}

interface ConditionsActions {
  togglePrecipitations: (cell: MeiosisCell<Conditions>, value: boolean) => void;
  changeSky: (cell: MeiosisCell<Conditions>, value: Sky) => void;
}

interface ConditionsAttrs {
  cell: MeiosisCell<Conditions>;
}

interface SkyOptionAttrs extends ConditionsAttrs {
  value: string;
  label: string;
}

interface TemperatureActions {
  increment: (cell: MeiosisCell<Temperature>, amount: number) => void;
  changeUnits: (cell: MeiosisCell<Temperature>) => void;
}

interface TemperatureAttrs {
  cell: MeiosisCell<Temperature>;
}

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const conditionsActions: ConditionsActions = {
  togglePrecipitations: (cell, value) => {
    cell.update(state => ({
      ...state,
      precipitations: value
    }));
  },
  changeSky: (cell, value) => {
    cell.update(state => ({
      ...state,
      sky: value
    }));
  }
};

const SkyOption: (attrs: SkyOptionAttrs) => ReactElement = ({ cell, value, label }) => (
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

const Conditions: (attrs: ConditionsAttrs) => ReactElement = ({ cell }) => (
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

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const temperatureActions: TemperatureActions = {
  increment: (cell, amount) => {
    cell.update(state => ({
      ...state,
      value: state.value + amount
    }));
  },
  changeUnits: cell => {
    cell.update(state => {
      const value = state.value;
      const newUnits = state.units === "C" ? "F" : "C";
      const newValue = convert(value, newUnits);

      return {
        ...state,
        value: newValue,
        units: newUnits
      };
    });
  }
};

const Temperature: (attrs: TemperatureAttrs) => ReactElement = ({ cell }) => (
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

const app: App<State> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const App: (attrs: Attrs) => ReactElement = ({ cell }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
    <div>
      <Conditions cell={cell.nest("conditions")} />
      <Temperature cell={cell.nest("temperature").nest("air")} />
      <Temperature cell={cell.nest("temperature").nest("water")} />
    </div>
    <pre style={{ margin: "0" }}>{JSON.stringify(cell.state, null, 4)}</pre>
  </div>
);

export const setupReactExample = (): void => {
  const Root = ({ states, getCell }) => {
    const [init, setInit] = React.useState(false);
    const [, setState] = React.useState(states());

    if (!init) {
      setInit(true);
      states.map(setState);
    }

    return React.createElement(App, { cell: getCell() });
  };

  const { states, getCell } = setup<State>({
    stream: toStream(flyd),
    app
  });
  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(Root, { states, getCell }), element);
};
