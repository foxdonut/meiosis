// @ts-check

import meiosis from "../../source/dist/index";
import meiosisPreact from "../../preact/dist";
import merge from "mergerino";
import { h, render as preactRender } from "preact";
import { useState } from "preact/hooks";
import { app, convert } from "./common";

// preact + mergerino + simple-stream
const nest = meiosis.mergerino.nest;

const conditionsActions = {
  togglePrecipitations: (cell, value) => {
    cell.update({ precipitations: value });
  },
  changeSky: (cell, value) => {
    cell.update({ sky: value });
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
      checked: cell.getState().sky === value,
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
        checked: cell.getState().precipitations,
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
    cell.update({ value: x => x + amount });
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
    cell.getState().label,
    " Temperature: ",
    cell.getState().value,
    h("span", { dangerouslySetInnerHTML: { __html: "&deg;" } }),
    cell.getState().units,
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

const Root = ({ cell }) =>
  h(
    "div",
    { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
    h(
      "div",
      {},
      h(Conditions, { cell: nest(cell, "conditions") }),
      h(Temperature, { cell: nest(nest(cell, "temperature"), "air") }),
      h(Temperature, { cell: nest(nest(cell, "temperature"), "water") })
    ),
    h("pre", { style: { margin: "0" } }, JSON.stringify(cell.getState(), null, 4))
  );

const App = meiosisPreact({ h, useState, Root });

export const setupPreactExample = () => {
  const cell = meiosis.mergerino.meiosisCell({ stream: meiosis.simpleStream, merge, app });
  const element = document.getElementById("preactApp");
  preactRender(h(App, { states: cell.getState, cell }), element);
};
