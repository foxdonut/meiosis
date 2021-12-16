import meiosis, {
  MergerinoApp,
  MergerinoCell,
  MergerinoCellActionConstructor
} from "../../source/dist";
import meiosisPreact from "../../preact/dist";
import merge from "mergerino";
import { h, render as preactRender, VNode } from "preact";
import { useState } from "preact/hooks";
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

// preact + mergerino + simple-stream
interface Attrs {
  cell: MergerinoCell<State>;
}

interface ConditionsAttrs {
  cell: MergerinoCell<Conditions, ConditionsActions>;
}

interface SkyOptionAttrs extends ConditionsAttrs {
  value: string;
  label: string;
}

interface TemperatureAttrs {
  cell: MergerinoCell<Temperature, TemperatureActions>;
}

const nest = meiosis.mergerino.nest;

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const ConditionsActionsConstr: MergerinoCellActionConstructor<
  Conditions,
  ConditionsActions
> = cell => ({
  togglePrecipitations: value => {
    cell.update({ precipitations: value });
  },
  changeSky: value => {
    cell.update({ sky: value });
  }
});

// Normally we could use JSX with the Preact.h pragma, but since we already have React in this
// file, we'll use h here.
const SkyOption: (attrs: SkyOptionAttrs) => VNode = ({ cell, value, label }) =>
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

const Conditions: (attrs: ConditionsAttrs) => VNode = ({ cell }) =>
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

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const TemperatureActionsConstr: MergerinoCellActionConstructor<
  Temperature,
  TemperatureActions
> = cell => ({
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

const Temperature: (attrs: TemperatureAttrs) => VNode = ({ cell }) =>
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

const app: MergerinoApp<State, never> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const Root: (attrs: Attrs) => VNode = ({ cell }) =>
  h(
    "div",
    { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
    h(
      "div",
      {},
      h(Conditions, { cell: nest(cell, "conditions", ConditionsActionsConstr) }),
      h(Temperature, { cell: nest(nest(cell, "temperature"), "air", TemperatureActionsConstr) }),
      h(Temperature, { cell: nest(nest(cell, "temperature"), "water", TemperatureActionsConstr) })
    ),
    h("pre", { style: { margin: "0" } }, JSON.stringify(cell.getState(), null, 4))
  );

// const App = meiosisPreact<State, Attrs, VNode>({ h, useState, Root });
const App = meiosisPreact<Attrs, VNode>({ h, useState, Root });

export const setupPreactExample = (): void => {
  const cell = meiosis.mergerino.cell<State, never>({
    stream: meiosis.simpleStream,
    merge,
    app
  });

  // Just testing TypeScript support here.
  const _test = meiosis.simpleStream.stream<number>();
  const _init = _test();
  _test(5);
  cell.update({ temperature: { air: { value: 21 } } });
  cell.update({ temperature: { air: { value: x => x + 1 } } });
  cell.update({ temperature: { air: { value: () => 21 } } });

  const element = document.getElementById("preactApp") as HTMLElement;
  preactRender(h(App, { states: cell.getState, cell }), element);
};
