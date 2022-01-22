// mithril + mergerino + mithril-stream
import { CellApp, MeiosisCell, nest, setupCell } from "../../source/dist/mergerino";
import merge from "mergerino";
import m from "mithril";
import MStream from "mithril/stream";
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

interface ConditionsAttrs {
  cell: MeiosisCell<Conditions>;
}

interface SkyOptionAttrs extends ConditionsAttrs {
  value: string;
  label: string;
}

interface TemperatureAttrs {
  cell: MeiosisCell<Temperature>;
}

interface ConditionsActions {
  togglePrecipitations: (cell: MeiosisCell<Conditions>, value: boolean) => void;
  changeSky: (cell: MeiosisCell<Conditions>, value: Sky) => void;
}

interface TemperatureActions {
  increment: (cell: MeiosisCell<Temperature>, amount: number) => void;
  changeUnits: (cell: MeiosisCell<Temperature>) => void;
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

const SkyOption: m.Component<SkyOptionAttrs> = {
  view: ({ attrs: { cell, value, label } }) =>
    m(
      "label",
      m("input", {
        type: "radio",
        value,
        checked: cell.getState().sky === value,
        // FIXME: evt type
        onchange: evt => conditionsActions.changeSky(cell, evt.target.value)
      }),
      label
    )
};

const Conditions: m.Component<ConditionsAttrs> = {
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

const Temperature: m.Component<TemperatureAttrs> = {
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

const app: CellApp<State, never> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const App: m.Component<Attrs> = {
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

export const setupMithrilExample = (): void => {
  const stream = {
    stream: (value?: any) => MStream(value),
    scan: (acc: any, init: any, stream: any) => MStream.scan(acc, init, stream)
  };

  const cell = setupCell<State, never>({ stream, merge, app });

  m.mount(document.getElementById("mithrilApp") as HTMLElement, {
    view: () => m(App, { cell })
  });

  cell.getState.map(() => m.redraw());
};
