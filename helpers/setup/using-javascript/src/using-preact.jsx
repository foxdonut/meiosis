// @ts-check

import meiosis from "../../source/dist/index";
import merge from "mergerino";
import meiosisPreact from "meiosis-setup-preact";
import { h, render as preactRender } from "preact";
import { useState } from "preact/hooks";
import { app, convert } from "./common";

// preact + mergerino + simple-stream
const nest = meiosis.mergerino.nest;

const conditionsActions = {
  togglePrecipitations: (context, value) => {
    context.update({ precipitations: value });
  },
  changeSky: (context, value) => {
    context.update({ sky: value });
  }
};

// Normally we could use JSX with the Preact.h pragma, but since we already have React in this
// project, we'll use h here.
const SkyOption = ({ context, value, label }) =>
  h(
    "label",
    {},
    h("input", {
      type: "radio",
      value,
      checked: context.getState().sky === value,
      onchange: evt => conditionsActions.changeSky(context, evt.target.value)
    }),
    label
  );

const Conditions = ({ context }) =>
  h(
    "div",
    {},
    h(
      "label",
      {},
      h("input", {
        type: "checkbox",
        checked: context.getState().precipitations,
        onchange: evt => conditionsActions.togglePrecipitations(context, evt.target.checked)
      }),
      "Precipitations"
    ),
    h(
      "div",
      {},
      h(SkyOption, { context, value: "SUNNY", label: "Sunny" }),
      h(SkyOption, { context, value: "CLOUDY", label: "Cloudy" }),
      h(SkyOption, { context, value: "MIX", label: "Mix of sun/clouds" })
    )
  );

const temperatureActions = {
  increment: (context, amount) => {
    context.update({ value: x => x + amount });
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

const Temperature = ({ context }) =>
  h(
    "div",
    {},
    context.getState().label,
    " Temperature: ",
    context.getState().value,
    h("span", { dangerouslySetInnerHTML: { __html: "&deg;" } }),
    context.getState().units,
    h(
      "div",
      {},
      h("button", { onclick: () => temperatureActions.increment(context, 1) }, "Increment"),
      h("button", { onclick: () => temperatureActions.increment(context, -1) }, "Decrement")
    ),
    h(
      "div",
      {},
      h("button", { onclick: () => temperatureActions.changeUnits(context) }, "Change Units")
    )
  );

const Root = ({ context }) =>
  h(
    "div",
    { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
    h(
      "div",
      {},
      h(Conditions, { context: nest(context, "conditions") }),
      h(Temperature, { context: nest(nest(context, "temperature"), "air") }),
      h(Temperature, { context: nest(nest(context, "temperature"), "water") })
    ),
    h("pre", { style: { margin: "0" } }, JSON.stringify(context.getState(), null, 4))
  );

const App = meiosisPreact({ h, useState, Root });

export const setupPreactExample = () => {
  const context = meiosis.mergerino.meiosisOne({ stream: meiosis.simpleStream, merge, app });
  const element = document.getElementById("preactApp");
  preactRender(h(App, { states: context.getState, context }), element);
};
