// @ts-check

import meiosis from "../../source/dist/index";
import merge from "mergerino";
import m from "mithril";
import Stream from "mithril/stream";
import { app, convert } from "./common";

// mithril + mergerino + mithril-stream
const nest = meiosis.mergerino.nest;

const conditionsActions = {
  togglePrecipitations: (cell, value) => {
    cell.update({ precipitations: value });
  },
  changeSky: (cell, value) => {
    cell.update({ sky: value });
  }
};

const SkyOption = {
  view: ({ attrs: { cell, value, label } }) =>
    m(
      "label",
      m("input", {
        type: "radio",
        value,
        checked: cell.getState().sky === value,
        onchange: evt => conditionsActions.changeSky(cell, evt.target.value)
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
          onchange: evt => conditionsActions.togglePrecipitations(cell, evt.target.checked)
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
        m("button", { onclick: () => temperatureActions.increment(cell, 1) }, "Increment"),
        m("button", { onclick: () => temperatureActions.increment(cell, -1) }, "Decrement")
      ),
      m("div", m("button", { onclick: () => temperatureActions.changeUnits(cell) }, "Change Units"))
    )
};

const App = {
  view: ({ attrs: { cell } }) =>
    m(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
      m(
        "div",
        m(Conditions, { cell: nest(cell, "conditions") }),
        m(Temperature, { cell: nest(nest(cell, "temperature"), "air") }),
        m(Temperature, { cell: nest(nest(cell, "temperature"), "water") })
      ),
      m("pre", { style: { margin: "0" } }, JSON.stringify(cell.getState(), null, 4))
    )
};

export const setupMithrilExample = () => {
  const stream = {
    stream: Stream,
    scan: (acc, init, stream) => Stream.scan(acc, init, stream)
  };

  const cell = meiosis.mergerino.cell({ stream, merge, app });

  m.mount(document.getElementById("mithrilApp"), {
    view: () => m(App, { cell })
  });

  cell.getState.map(() => m.redraw());
};