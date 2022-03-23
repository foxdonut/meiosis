// @ts-check
// preact + functionPatches + simple-stream

import meiosis from "../../source/dist/index";
import { h, render as preactRender } from "preact";
import { add, assoc, over, lensProp } from "rambda";
import { app, convert } from "./common";

const conditionsActions = {
  togglePrecipitations: (cell, value) => {
    cell.update(assoc("precipitations", value));
  },
  changeSky: (cell, value) => {
    cell.update(assoc("sky", value));
  }
};

// Normally we could use JSX with the Preact.h pragma, but since we already have React in this
// project, we'll use h here.
const SkyOption = ({ cell, value, label }) =>
  h(
    "label",
    {},
    h("input", {
      type: "radio",
      value,
      checked: cell.state.sky === value,
      onchange: evt => conditionsActions.changeSky(cell, evt.target.value)
    }),
    label
  );

const Conditions = ({ cell }) =>
  h(
    "div",
    {},
    h(
      "label",
      {},
      h("input", {
        type: "checkbox",
        checked: cell.state.precipitations,
        onchange: evt => conditionsActions.togglePrecipitations(cell, evt.target.checked)
      }),
      "Precipitations"
    ),
    h(
      "div",
      {},
      h(SkyOption, { cell, value: "SUNNY", label: "Sunny" }),
      h(SkyOption, { cell, value: "CLOUDY", label: "Cloudy" }),
      h(SkyOption, { cell, value: "MIX", label: "Mix of sun/clouds" })
    )
  );

const temperatureActions = {
  increment: (cell, amount) => {
    cell.update(over(lensProp("value"), add(amount)));
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

const Temperature = ({ cell }) =>
  h(
    "div",
    {},
    cell.state.label,
    " Temperature: ",
    cell.state.value,
    h("span", { dangerouslySetInnerHTML: { __html: "&deg;" } }),
    cell.state.units,
    h(
      "div",
      {},
      h("button", { onclick: () => temperatureActions.increment(cell, 1) }, "Increment"),
      h("button", { onclick: () => temperatureActions.increment(cell, -1) }, "Decrement")
    ),
    h(
      "div",
      {},
      h("button", { onclick: () => temperatureActions.changeUnits(cell) }, "Change Units")
    )
  );

const App = ({ cell }) =>
  h(
    "div",
    { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
    h(
      "div",
      {},
      h(Conditions, { cell: cell.nest("conditions") }),
      h(Temperature, { cell: cell.nest("temperature").nest("air") }),
      h(Temperature, { cell: cell.nest("temperature").nest("water") })
    ),
    h("pre", { style: { margin: "0" } }, JSON.stringify(cell.state, null, 4))
  );

export const setupPreactExample = () => {
  const cells = meiosis.functionPatches.setup({ app });
  const element = document.getElementById("preactApp");
  cells.map(cell => {
    preactRender(h(App, { cell }), element);
  });
};
