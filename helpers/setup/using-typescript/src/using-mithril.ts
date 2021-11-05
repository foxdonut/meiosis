import meiosis, { MergerinoApp, MergerinoContext } from "../../source/dist";
import merge from "mergerino";
import m from "mithril";
import MStream from "mithril/stream";
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

// mithril + mergerino + mithril-stream
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

const SkyOption: m.Component<SkyOptionAttrs> = {
  view: ({ attrs: { context, value, label } }) =>
    m(
      "label",
      m("input", {
        type: "radio",
        value,
        checked: context.getState().sky === value,
        // FIXME: evt type
        onchange: evt => conditionsActions.changeSky(context, evt.target.value)
      }),
      label
    )
};

const Conditions: m.Component<ConditionsAttrs> = {
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

const Temperature: m.Component<TemperatureAttrs> = {
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

const app: MergerinoApp<State, never> = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.Initial("Air"),
      water: temperature.Initial("Water")
    }
  }
};

const App: m.Component<Attrs> = {
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

export const setupMithrilExample = (): void => {
  const stream = {
    stream: (value?: any) => MStream(value),
    scan: (acc: any, init: any, stream: any) => MStream.scan(acc, init, stream)
  };

  const context = meiosis.mergerino.meiosisOne<State, never>({ stream, merge, app });

  m.mount(document.getElementById("mithrilApp") as HTMLElement, {
    view: () => m(App, { context })
  });

  context.getState.map(() => m.redraw());
};
