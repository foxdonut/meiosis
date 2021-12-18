// @ts-check
// lit-html + functionPatches + simple-stream

import meiosis from "../../source/dist/index";
import { html, render as litHtmlRender } from "lit-html";
import { app, convert } from "./common";

const nest = meiosis.functionPatches.nest;

const ConditionsActions = cell => ({
  togglePrecipitations: value => {
    cell.update(state => ({ ...state, precipitations: value }));
  },
  changeSky: value => {
    cell.update(state => ({ ...state, sky: value }));
  }
});

const skyOption = ({ cell, value, label }) => html`
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

const Conditions = cell => html`
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

const TemperatureActions = cell => ({
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

const Temperature = cell => html`
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

const App = cell => html`
  <div style="display: grid; grid-template-columns: 1fr 1fr">
    <div>
      ${Conditions(nest(cell, "conditions", ConditionsActions))}
      ${Temperature(nest(nest(cell, "temperature"), "air", TemperatureActions))}
      ${Temperature(nest(nest(cell, "temperature"), "water", TemperatureActions))}
    </div>
    <pre style="margin: 0">${JSON.stringify(cell.getState(), null, 4)}</pre>
  </div>
`;

export const setupLitHtmlExample = () => {
  const cell = meiosis.functionPatches.setupCell({ stream: meiosis.simpleStream, app });
  const element = document.getElementById("litHtmlApp");
  cell.getState.map(() => litHtmlRender(App(cell), element));
};
