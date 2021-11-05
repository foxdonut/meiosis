import meiosis, { ImmerApp, ImmerContext } from "../../source/dist";
import meiosisReact from "meiosis-setup-react";
import flyd from "flyd";
import produce from "immer";
import React from "react";
import ReactDOM, { ReactElement } from "react-dom";
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
  context: ImmerContext<State>;
}

interface ConditionsAttrs {
  context: ImmerContext<Conditions>;
}

interface SkyOptionAttrs extends ConditionsAttrs {
  value: string;
  label: string;
}

interface TemperatureAttrs {
  context: ImmerContext<Temperature>;
}

const nest = meiosis.immer.nest(produce);

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const conditionsActions: ConditionsActions<ImmerContext<Conditions>> = {
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

const SkyOption: (attrs: SkyOptionAttrs) => ReactElement = ({ context, value, label }) => (
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

const Conditions: (attrs: ConditionsAttrs) => ReactElement = ({ context }) => (
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

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const temperatureActions: TemperatureActions<ImmerContext<Temperature>> = {
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

const Temperature: (attrs: TemperatureAttrs) => ReactElement = ({ context }) => (
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

const app: ImmerApp<State, never> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const Root: (attrs: Attrs) => ReactElement = ({ context }) => (
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
  stream: (value?: any) => flyd.stream(value),
  scan: (acc: any, init: any, stream: any) => flyd.scan(acc, init, stream)
};

const context = meiosis.immer.meiosisOne<State, never>({
  stream,
  produce: (s, p) => produce(s, p),
  app
});

// const App = meiosisReact<State, Attrs, ReactElement>({ React, Root });
const App = meiosisReact<Attrs>({ React, Root });

export const setupReactExample = (): void => {
  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states: context.getState, context }), element);
};
