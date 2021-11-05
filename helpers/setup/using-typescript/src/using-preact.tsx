import meiosis, { MergerinoApp, MergerinoContext } from "../../source/dist";
import meiosisPreact from "meiosis-setup-preact";
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
  context: MergerinoContext<State>;
}

interface ConditionsAttrs {
  context: MergerinoContext<Conditions>;
}

interface SkyOptionAttrs extends ConditionsAttrs {
  value: string;
  label: string;
}

interface TemperatureAttrs {
  context: MergerinoContext<Temperature>;
}

const nest = meiosis.mergerino.nest;

const conditions: ConditionsComponent = {
  initial: initialConditions
};

const conditionsActions: ConditionsActions<MergerinoContext<Conditions>> = {
  togglePrecipitations: (context, value) => {
    context.update({ precipitations: value });
  },
  changeSky: (context, value) => {
    context.update({ sky: value });
  }
};

// Normally we could use JSX with the Preact.h pragma, but since we already have React in this
// file, we'll use h here.
const SkyOption: (attrs: SkyOptionAttrs) => VNode = ({ context, value, label }) =>
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

const Conditions: (attrs: ConditionsAttrs) => VNode = ({ context }) =>
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

const temperature: TemperatureComponent = {
  Initial: InitialTemperature
};

const temperatureActions: TemperatureActions<MergerinoContext<Temperature>> = {
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

const Temperature: (attrs: TemperatureAttrs) => VNode = ({ context }) =>
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

const app: MergerinoApp<State, never> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const Root: (attrs: Attrs) => VNode = ({ context }) =>
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

// const App = meiosisPreact<State, Attrs, VNode>({ h, useState, Root });
const App = meiosisPreact<Attrs, VNode>({ h, useState, Root });

export const setupPreactExample = (): void => {
  const context = meiosis.mergerino.meiosisOne<State, never>({
    stream: meiosis.simpleStream,
    merge,
    app
  });

  // Just testing TypeScript support here.
  const _test = meiosis.simpleStream.stream<number>();
  const _init = _test();
  _test(5);
  context.update({ temperature: { air: { value: 21 } } });
  context.update({ temperature: { air: { value: x => x + 1 } } });
  context.update({ temperature: { air: { value: () => 21 } } });

  const element = document.getElementById("preactApp") as HTMLElement;
  preactRender(h(App, { states: context.getState, context }), element);
};
