import meiosis, {
  FunctionPatchesApp,
  FunctionPatchesCell,
  FunctionPatchesCellActionConstructor
} from "../../source/dist";
import { html, render as litHtmlRender, TemplateResult } from "lit-html";
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

// lit-html + functionPatches + simple-stream
const nest = meiosis.functionPatches.nest;

interface SkyOptionAttrs {
  cell: FunctionPatchesCell<Conditions, ConditionsActions>;
  value: string;
  label: string;
}

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const ConditionsActionsConstr: FunctionPatchesCellActionConstructor<
  Conditions,
  ConditionsActions
> = cell => ({
  togglePrecipitations: value => {
    cell.update(state => ({ ...state, precipitations: value }));
  },
  changeSky: value => {
    cell.update(state => ({ ...state, sky: value }));
  }
});

const skyOption: (attrs: SkyOptionAttrs) => TemplateResult = ({ cell, value, label }) => html`
  <label>
    <input
      type="radio"
      value=${value}
      .checked=${cell.getState().sky === value}
      @change=${evt => cell.actions.changeSky(evt.target.value)}
    />
    ${label}
  </label>
`;

const Conditions: (
  cell: FunctionPatchesCell<Conditions, ConditionsActions>
) => TemplateResult = cell => html`
  <div>
    <label>
      <input
        type="checkbox"
        .checked=${cell.getState().precipitations}
        @change=${evt => cell.actions.togglePrecipitations(evt.target.checked)}
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

const TemperatureActionsConstr: FunctionPatchesCellActionConstructor<
  Temperature,
  TemperatureActions
> = cell => ({
  increment: amount => {
    cell.update(state => ({ ...state, value: state.value + amount }));
  },
  changeUnits: () => {
    cell.update(state => {
      const value = state.value;
      const newUnits = state.units === "C" ? "F" : "C";
      const newValue = convert(value, newUnits);
      return { ...state, value: newValue, units: newUnits };
    });
  }
});

const Temperature: (
  cell: FunctionPatchesCell<Temperature, TemperatureActions>
) => TemplateResult = cell => html`
  <div>
    ${cell.getState().label} Temperature: ${cell.getState().value}&deg;${cell.getState().units}
    <div>
      <button @click=${() => cell.actions.increment(1)}>Increment</button>
      <button @click=${() => cell.actions.increment(-1)}>Decrement</button>
    </div>
    <div>
      <button @click=${() => cell.actions.changeUnits()}>Change Units</button>
    </div>
  </div>
`;

const app: FunctionPatchesApp<State, never> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const App: (cell: FunctionPatchesCell<State>) => TemplateResult = cell => html`
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <div>
      ${Conditions(nest(cell, "conditions", ConditionsActionsConstr))}
      ${Temperature(nest(nest(cell, "temperature"), "air", TemperatureActionsConstr))}
      ${Temperature(nest(nest(cell, "temperature"), "water", TemperatureActionsConstr))}
    </div>
    <pre style="margin: 0">${JSON.stringify(cell.getState(), null, 4)}</pre>
  </div>
`;

export const setupLitHtmlExample = (): void => {
  const cell = meiosis.functionPatches.cell<State, never>({
    stream: meiosis.simpleStream,
    app
  });

  const element = document.getElementById("litHtmlApp") as HTMLElement;
  cell.getState.map(() => litHtmlRender(App(cell), element));
};
