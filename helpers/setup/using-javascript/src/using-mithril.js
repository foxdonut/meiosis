// @ts-check

import meiosis from "../../source/dist/index";
import merge from "mergerino";
import m from "mithril";
import Stream from "mithril/stream";
import { app, convert } from "./common";

// mithril + mergerino + mithril-stream
const nest = meiosis.mergerino.nest;

const conditionsActions = {
  togglePrecipitations: (context, value) => {
    context.update({ precipitations: value });
  },
  changeSky: (context, value) => {
    context.update({ sky: value });
  }
};

const SkyOption = {
  view: ({ attrs: { context, value, label } }) =>
    m(
      "label",
      m("input", {
        type: "radio",
        value,
        checked: context.getState().sky === value,
        onchange: evt => conditionsActions.changeSky(context, evt.target.value)
      }),
      label
    )
};

const Conditions = {
  view: ({ attrs: { context } }) =>
    m(
      "div",
      m(
        "label",
        m("input", {
          type: "checkbox",
          checked: context.getState().precipitations,
          onchange: evt => conditionsActions.togglePrecipitations(context, evt.target.checked)
        }),
        "Precipitations"
      ),
      m(
        "div",
        m(SkyOption, { context, value: "SUNNY", label: "Sunny" }),
        m(SkyOption, { context, value: "CLOUDY", label: "Cloudy" }),
        m(SkyOption, { context, value: "MIX", label: "Mix of sun/clouds" })
      )
    )
};

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

const Temperature = {
  view: ({ attrs: { context } }) =>
    m(
      "div",
      context.getState().label,
      " Temperature: ",
      context.getState().value,
      m.trust("&deg;"),
      context.getState().units,
      m(
        "div",
        m("button", { onclick: () => temperatureActions.increment(context, 1) }, "Increment"),
        m("button", { onclick: () => temperatureActions.increment(context, -1) }, "Decrement")
      ),
      m(
        "div",
        m("button", { onclick: () => temperatureActions.changeUnits(context) }, "Change Units")
      )
    )
};

const App = {
  view: ({ attrs: { context } }) =>
    m(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
      m(
        "div",
        m(Conditions, { context: nest(context, "conditions") }),
        m(Temperature, { context: nest(nest(context, "temperature"), "air") }),
        m(Temperature, { context: nest(nest(context, "temperature"), "water") })
      ),
      m("pre", { style: { margin: "0" } }, JSON.stringify(context.getState(), null, 4))
    )
};

export const setupMithrilExample = () => {
  const stream = {
    stream: Stream,
    scan: (acc, init, stream) => Stream.scan(acc, init, stream)
  };

  const context = meiosis.mergerino.meiosisOne({ stream, merge, app });

  m.mount(document.getElementById("mithrilApp"), {
    view: () => m(App, { context })
  });

  context.getState.map(() => m.redraw());
};
