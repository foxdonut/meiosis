// lit-html + functionPatches + simple-stream
import simpleStream from "../../source/dist/simple-stream";
import { App, Meiosis, setup } from "../../source/dist/functionPatches";
import { html, render as litHtmlRender, TemplateResult } from "lit-html";
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

interface SkyOptionAttrs {
  cell: Meiosis<Conditions>;
  value: string;
  label: string;
}

interface ConditionsActions {
  togglePrecipitations: (cell: Meiosis<Conditions>, value: boolean) => void;
  changeSky: (cell: Meiosis<Conditions>, value: Sky) => void;
}

interface TemperatureActions {
  increment: (cell: Meiosis<Temperature>, amount: number) => void;
  changeUnits: (cell: Meiosis<Temperature>) => void;
}

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const conditionsActions: ConditionsActions = {
  togglePrecipitations: (cell, value) => {
    cell.update(state => ({ ...state, precipitations: value }));
  },
  changeSky: (cell, value) => {
    cell.update(state => ({ ...state, sky: value }));
  }
};

const skyOption: (attrs: SkyOptionAttrs) => TemplateResult = ({ cell, value, label }) => html`
  <label>
    <input
      type="radio"
      value=${value}
      .checked=${cell.getState().sky === value}
      @change=${evt => conditionsActions.changeSky(cell, evt.target.value)}
    />
    ${label}
  </label>
`;

const Conditions: (cell: Meiosis<Conditions>) => TemplateResult = cell => html`
  <div>
    <label>
      <input
        type="checkbox"
        .checked=${cell.getState().precipitations}
        @change=${evt => conditionsActions.togglePrecipitations(cell, evt.target.checked)}
      />
      Precipitations
    </label>
    <div>
      ${skyOption({ cell, value: "SUNNY", label: "Sunny" })}
      ${skyOption({ cell, value: "CLOUDY", label: "Cloudy" })}
      ${skyOption({ cell, value: "MIX", label: "Mix of sun/clouds" })}
    </div>
  </div>
`;

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const temperatureActions: TemperatureActions = {
  increment: (cell, amount) => {
    cell.update(state => ({ ...state, value: state.value + amount }));
  },
  changeUnits: cell => {
    cell.update(state => {
      const value = state.value;
      const newUnits = state.units === "C" ? "F" : "C";
      const newValue = convert(value, newUnits);
      return { ...state, value: newValue, units: newUnits };
    });
  }
};

const Temperature: (cell: Meiosis<Temperature>) => TemplateResult = cell => html`
  <div>
    ${cell.getState().label} Temperature: ${cell.getState().value}&deg;${cell.getState().units}
    <div>
      <button @click=${() => temperatureActions.increment(cell, 1)}>Increment</button>
      <button @click=${() => temperatureActions.increment(cell, -1)}>Decrement</button>
    </div>
    <div>
      <button @click=${() => temperatureActions.changeUnits(cell)}>Change Units</button>
    </div>
  </div>
`;

const app: App<State> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const App: (cell: Meiosis<State>) => TemplateResult = cell => html`
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <div>
      ${Conditions(cell.nest("conditions"))} ${Temperature(cell.nest("temperature").nest("air"))}
      ${Temperature(cell.nest("temperature").nest("water"))}
    </div>
    <pre style="margin: 0">${JSON.stringify(cell.getState(), null, 4)}</pre>
  </div>
`;

export const setupLitHtmlExample = (): void => {
  const cell = setup<State>({ stream: simpleStream, app });
  const element = document.getElementById("litHtmlApp") as HTMLElement;
  cell.getState.map(() => litHtmlRender(App(cell), element));
};
