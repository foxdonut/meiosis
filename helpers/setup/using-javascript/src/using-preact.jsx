// @ts-check
// preact + mergerino + simple-stream

import meiosis from "../../source/dist/index";
import meiosisPreact from "../../preact/dist";
import merge from "mergerino";
import { h, render as preactRender } from "preact";
import { useState } from "preact/hooks";
import { app, convert } from "./common";

const nest = meiosis.mergerino.nest;

const ConditionsActions = cell => ({
  togglePrecipitations: value => {
    cell.update({ precipitations: value });
  },
  changeSky: value => {
    cell.update({ sky: value });
  }
});

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
      onchange: evt => cell.actions.changeSky(evt.target.value)
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
        onchange: evt => cell.actions.togglePrecipitations(evt.target.checked)
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

const TemperatureActions = cell => ({
  increment: amount => {
    cell.update({ value: x => x + amount });
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
      h("button", { onclick: () => cell.actions.increment(1) }, "Increment"),
      h("button", { onclick: () => cell.actions.increment(-1) }, "Decrement")
    ),
    h("div", {}, h("button", { onclick: () => cell.actions.changeUnits() }, "Change Units"))
  );

const Root = ({ cell }) =>
  h(
    "div",
    { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
    h(
      "div",
      {},
      h(Conditions, { cell: nest(cell, "conditions", ConditionsActions) }),
      h(Temperature, { cell: nest(nest(cell, "temperature", TemperatureActions), "air") }),
      h(Temperature, { cell: nest(nest(cell, "temperature", TemperatureActions), "water") })
    ),
    h("pre", { style: { margin: "0" } }, JSON.stringify(cell.getState(), null, 4))
  );

const App = meiosisPreact({ h, useState, Root });

export const setupPreactExample = () => {
  const cell = meiosis.mergerino.cell({ stream: meiosis.simpleStream, merge, app });
  const element = document.getElementById("preactApp");
  preactRender(h(App, { states: cell.getState, cell }), element);
};
