import meiosis, { FunctionPatchesApp, FunctionPatchesContext } from "../../source/dist";
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
  context: FunctionPatchesContext<Conditions>;
  value: string;
  label: string;
}

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const conditionsActions: ConditionsActions<FunctionPatchesContext<Conditions>> = {
  togglePrecipitations: (context, value) => {
    context.update(state => ({ ...state, precipitations: value }));
  },
  changeSky: (context, value) => {
    context.update(state => ({ ...state, sky: value }));
  }
};

const skyOption: (attrs: SkyOptionAttrs) => TemplateResult = ({ context, value, label }) => html`
  <label>
    <input
      type="radio"
      value=${value}
      .checked=${context.getState().sky === value}
      @change=${evt => conditionsActions.changeSky(context, evt.target.value)}
    />
    ${label}
  </label>
`;

const Conditions: (context: FunctionPatchesContext<Conditions>) => TemplateResult = context => html`
  <div>
    <label>
      <input
        type="checkbox"
        .checked=${context.getState().precipitations}
        @change=${evt => conditionsActions.togglePrecipitations(context, evt.target.checked)}
      />
      Precipitations
    </label>
    <div>
      ${skyOption({ context, value: "SUNNY", label: "Sunny" })}
      ${skyOption({ context, value: "CLOUDY", label: "Cloudy" })}
      ${skyOption({ context, value: "MIX", label: "Mix of sun/clouds" })}
    </div>
  </div>
`;

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const temperatureActions: TemperatureActions<FunctionPatchesContext<Temperature>> = {
  increment: (context, amount) => {
    context.update(state => ({ ...state, value: state.value + amount }));
  },
  changeUnits: context => {
    context.update(state => {
      const value = state.value;
      const newUnits = state.units === "C" ? "F" : "C";
      const newValue = convert(value, newUnits);
      return { ...state, value: newValue, units: newUnits };
    });
  }
};

const Temperature: (
  context: FunctionPatchesContext<Temperature>
) => TemplateResult = context => html`
  <div>
    ${context.getState().label} Temperature:
    ${context.getState().value}&deg;${context.getState().units}
    <div>
      <button @click=${() => temperatureActions.increment(context, 1)}>Increment</button>
      <button @click=${() => temperatureActions.increment(context, -1)}>Decrement</button>
    </div>
    <div>
      <button @click=${() => temperatureActions.changeUnits(context)}>Change Units</button>
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

const App: (context: FunctionPatchesContext<State>) => TemplateResult = context => html`
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <div>
      ${Conditions(nest(context, "conditions"))}
      ${Temperature(nest(nest(context, "temperature"), "air"))}
      ${Temperature(nest(nest(context, "temperature"), "water"))}
    </div>
    <pre style="margin: 0">${JSON.stringify(context.getState(), null, 4)}</pre>
  </div>
`;

export const setupLitHtmlExample = (): void => {
  const context = meiosis.functionPatches.meiosisOne<State, never>({
    stream: meiosis.simpleStream,
    app
  });

  const element = document.getElementById("litHtmlApp") as HTMLElement;
  context.getState.map(() => litHtmlRender(App(context), element));
};
