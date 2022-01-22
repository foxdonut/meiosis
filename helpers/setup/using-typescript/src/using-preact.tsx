// preact + mergerino + simple-stream
import simpleStream from "../../source/dist/simple-stream";
import { CellApp, MeiosisCell, nest, setupCell } from "../../source/dist/mergerino";
import meiosisPreact from "../../preact/dist";
import merge from "mergerino";
import { h, render as preactRender, VNode } from "preact";
import { useState } from "preact/hooks";
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

interface Attrs {
  cell: MeiosisCell<State>;
}

interface ConditionsActions {
  togglePrecipitations: (cell: MeiosisCell<Conditions>, value: boolean) => void;
  changeSky: (cell: MeiosisCell<Conditions>, value: Sky) => void;
}

interface ConditionsAttrs {
  cell: MeiosisCell<Conditions>;
}

interface SkyOptionAttrs extends ConditionsAttrs {
  value: string;
  label: string;
}

interface TemperatureActions {
  increment: (cell: MeiosisCell<Temperature>, amount: number) => void;
  changeUnits: (cell: MeiosisCell<Temperature>) => void;
}

interface TemperatureAttrs {
  cell: MeiosisCell<Temperature>;
}

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const conditionsActions: ConditionsActions = {
  togglePrecipitations: (cell, value) => {
    cell.update({ precipitations: value });
  },
  changeSky: (cell, value) => {
    cell.update({ sky: value });
  }
};

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
      onchange: evt => conditionsActions.changeSky(cell, evt.target.value)
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

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const temperatureActions: TemperatureActions = {
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
      h("button", { onclick: () => temperatureActions.increment(cell, 1) }, "Increment"),
      h("button", { onclick: () => temperatureActions.increment(cell, -1) }, "Decrement")
    ),
    h(
      "div",
      {},
      h("button", { onclick: () => temperatureActions.changeUnits(cell) }, "Change Units")
    )
  );

const app: CellApp<State, never> = {
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
      h(Conditions, { cell: nest(cell, "conditions") }),
      h(Temperature, { cell: nest(nest(cell, "temperature"), "air") }),
      h(Temperature, { cell: nest(nest(cell, "temperature"), "water") })
    ),
    h("pre", { style: { margin: "0" } }, JSON.stringify(cell.getState(), null, 4))
  );

// const App = meiosisPreact<State, Attrs, VNode>({ h, useState, Root });
const App = meiosisPreact<Attrs, VNode>({ h, useState, Root });

export const setupPreactExample = (): void => {
  const cell = setupCell<State, never>({ stream: simpleStream, merge, app });

  // Just testing TypeScript support here.
  const _test = simpleStream.stream<number>();
  const _init = _test();
  _test(5);
  cell.update({ temperature: { air: { value: 21 } } });
  cell.update({ temperature: { air: { value: x => x + 1 } } });
  cell.update({ temperature: { air: { value: () => 21 } } });

  const element = document.getElementById("preactApp") as HTMLElement;
  preactRender(h(App, { states: cell.getState, cell }), element);
};
