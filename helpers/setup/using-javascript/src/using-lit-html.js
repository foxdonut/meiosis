// @ts-check

import meiosis from "../../source/dist/index";
import { html, render as litHtmlRender } from "lit-html";
import { app, convert } from "./common";

// lit-html + functionPatches + simple-stream
const nest = meiosis.functionPatches.nest;

const conditionsActions = {
  togglePrecipitations: (context, value) => {
    context.update(state => ({ ...state, precipitations: value }));
  },
  changeSky: (context, value) => {
    context.update(state => ({ ...state, sky: value }));
  }
};

const skyOption = ({ context, value, label }) => html`
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

const Conditions = context => html`
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

const temperatureActions = {
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

const Temperature = context => html`
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

const App = context => html`
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <div>
      ${Conditions(nest(context, "conditions"))}
      ${Temperature(nest(nest(context, "temperature"), "air"))}
      ${Temperature(nest(nest(context, "temperature"), "water"))}
    </div>
    <pre style="margin: 0">${JSON.stringify(context.getState(), null, 4)}</pre>
  </div>
`;

export const setupLitHtmlExample = () => {
  const context = meiosis.functionPatches.meiosisOne({ stream: meiosis.simpleStream, app });
  const element = document.getElementById("litHtmlApp");
  context.getState.map(() => litHtmlRender(App(context), element));
};
