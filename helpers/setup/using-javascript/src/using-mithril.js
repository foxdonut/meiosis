// @ts-check
// mithril + mergerino + mithril-stream

import meiosis from "../../source/dist/index";
import merge from "mergerino";
import m from "mithril";
import Stream from "mithril/stream";
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

const SkyOption = {
  view: ({ attrs: { cell, value, label } }) =>
    m(
      "label",
      m("input", {
        type: "radio",
        value,
        checked: cell.getState().sky === value,
        onchange: evt => cell.actions.changeSky(evt.target.value)
      }),
      label
    )
};

const Conditions = {
  view: ({ attrs: { cell } }) =>
    m(
      "div",
      m(
        "label",
        m("input", {
          type: "checkbox",
          checked: cell.getState().precipitations,
          onchange: evt => cell.actions.togglePrecipitations(evt.target.checked)
        }),
        "Precipitations"
      ),
      m(
        "div",
        m(SkyOption, { cell, value: "SUNNY", label: "Sunny" }),
        m(SkyOption, { cell, value: "CLOUDY", label: "Cloudy" }),
        m(SkyOption, { cell, value: "MIX", label: "Mix of sun/clouds" })
      )
    )
};

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

const Temperature = {
  view: ({ attrs: { cell } }) =>
    m(
      "div",
      cell.getState().label,
      " Temperature: ",
      cell.getState().value,
      m.trust("&deg;"),
      cell.getState().units,
      m(
        "div",
        m("button", { onclick: () => cell.actions.increment(1) }, "Increment"),
        m("button", { onclick: () => cell.actions.increment(-1) }, "Decrement")
      ),
      m("div", m("button", { onclick: () => cell.actions.changeUnits() }, "Change Units"))
    )
};

const App = {
  view: ({ attrs: { cell } }) =>
    m(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
      m(
        "div",
        m(Conditions, { cell: nest(cell, "conditions", ConditionsActions) }),
        m(Temperature, { cell: nest(nest(cell, "temperature"), "air", TemperatureActions) }),
        m(Temperature, { cell: nest(nest(cell, "temperature"), "water", TemperatureActions) })
      ),
      m("pre", { style: { margin: "0" } }, JSON.stringify(cell.getState(), null, 4))
    )
};

export const setupMithrilExample = () => {
  const stream = {
    stream: Stream,
    scan: (acc, init, stream) => Stream.scan(acc, init, stream)
  };

  const cell = meiosis.mergerino.setupCell({ stream, merge, app });

  m.mount(document.getElementById("mithrilApp"), {
    view: () => m(App, { cell })
  });

  cell.getState.map(() => m.redraw());
};
