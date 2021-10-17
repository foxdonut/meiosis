import meiosis, {
  FunctionPatchesApp,
  FunctionPatchesContext
  // ImmerPatch,
  // MergerinoApp,
  // MergerinoPatch,
  // Stream
} from "../../source/dist";
// import flyd from "flyd";
// import merge from "mergerino";
// import produce from "immer";
import { html, render as litHtmlRender, TemplateResult } from "lit-html";
// import m from "mithril";
// import MStream from "mithril/stream";
// import { h, render as preactRender, VNode } from "preact";
// import { useState } from "preact/hooks";
// import React from "react";
// import ReactDOM, { ReactElement } from "react-dom";

const { stream, scan } = meiosis.simpleStream;

// simple-stream
(() => {
  const s1 = stream<number>(0);
  const s2 = scan<number, number>((x, y) => x + y, 0, s1);
  s2.map(x => x);
})();

// common code
type Sky = "SUNNY" | "CLOUDY" | "MIX";

interface Conditions {
  precipitations: boolean;
  sky: Sky;
}

interface ConditionsActions {
  togglePrecipitations: (context: FunctionPatchesContext<Conditions>, value: boolean) => void;
  changeSky: (context: FunctionPatchesContext<Conditions>, value: Sky) => void;
}

type TemperatureUnits = "C" | "F";

interface Temperature {
  label: string;
  value: number;
  units: TemperatureUnits;
}

interface TemperatureActions {
  increment: (context: FunctionPatchesContext<Temperature>, amount: number) => void;
  changeUnits: (context: FunctionPatchesContext<Temperature>) => void;
}

interface TemperatureComponent {
  Initial: (label: string) => Temperature;
}

interface State {
  conditions: Conditions;
  temperature: {
    air: Temperature;
    water: Temperature;
  };
}

interface ConditionsComponent {
  initial: Conditions;
}

const initialConditions: Conditions = {
  precipitations: false,
  sky: "SUNNY"
};

const convert = (value: number, to: TemperatureUnits): number => {
  return Math.round(to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32);
};

const InitialTemperature = (label: string): Temperature => ({
  label,
  value: 22,
  units: "C"
});

// lit-html + functionPatches + simple-stream
(() => {
  const nest = meiosis.functionPatches.nest;

  interface SkyOptionAttrs {
    context: FunctionPatchesContext<Conditions>;
    value: string;
    label: string;
  }

  const conditionsActions: ConditionsActions = {
    togglePrecipitations: (context, value) => {
      context.update(state => ({ ...state, precipitations: value }));
    },
    changeSky: (context, value) => {
      context.update(state => ({ ...state, sky: value }));
    }
  };

  const conditions: ConditionsComponent = {
    initial: initialConditions
  };

  const skyOption: (attrs: SkyOptionAttrs) => TemplateResult = ({ context, value, label }) => html`
    <label>
      <input
        type="radio"
        value=${value}
        .checked=${context.getState().sky === value}
        @change=${evt => conditionsActions.changeSky(context, evt.target.value)}
      />
      ${label}
    </label>
  `;

  const Conditions: (
    context: FunctionPatchesContext<Conditions>
  ) => TemplateResult = context => html`
    <div>
      <label>
        <input
          type="checkbox"
          .checked=${context.getState().precipitations}
          @change=${evt => conditionsActions.togglePrecipitations(context, evt.target.checked)}
        />
        Precipitations
      </label>
      <div>
        ${skyOption({ context, value: "SUNNY", label: "Sunny" })}
        ${skyOption({ context, value: "CLOUDY", label: "Cloudy" })}
        ${skyOption({ context, value: "MIX", label: "Mix of sun/clouds" })}
      </div>
    </div>
  `;

  const temperature: TemperatureComponent = {
    Initial: InitialTemperature
  };

  const temperatureActions: TemperatureActions = {
    increment: (context, amount) => {
      context.update(state => ({ ...state, value: state.value + amount }));
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

  const Temperature: (
    context: FunctionPatchesContext<Temperature>
  ) => TemplateResult = context => html`
    <div>
      ${context.getState().label} Temperature:
      ${context.getState().value}&deg;${context.getState().units}
      <div>
        <button @click=${() => temperatureActions.increment(context, 1)}>Increment</button>
        <button @click=${() => temperatureActions.increment(context, -1)}>Decrement</button>
      </div>
      <div>
        <button @click=${() => temperatureActions.changeUnits(context)}>Change Units</button>
      </div>
    </div>
  `;

  const app: FunctionPatchesApp<State> = {
    initial: {
      conditions: conditions.initial,
      temperature: {
        air: temperature.Initial("Air"),
        water: temperature.Initial("Water")
      }
    }
  };

  const App: (context: FunctionPatchesContext<State>) => TemplateResult = context => {
    return html`
      <div style="display: grid; grid-template-columns: 1fr 1fr">
        <div>
          ${Conditions(nest(context, "conditions"))}
          ${Temperature(nest(nest(context, "temperature"), "air"))}
          ${Temperature(nest(nest(context, "temperature"), "water"))}
        </div>
        <pre style="margin: 0">${JSON.stringify(context.getState(), null, 4)}</pre>
      </div>
    `;
  };

  const context = meiosis.functionPatches.meiosisOne<State>({
    stream: meiosis.simpleStream,
    app
  });

  const element = document.getElementById("litHtmlApp") as HTMLElement;
  context.getState.map(() => litHtmlRender(App(context), element));
})();

// mithril + mergerino + mithril-stream
/*
(() => {
  type Patch = MergerinoPatch<State>;
  type Update = Stream<Patch>;
  type ConditionsLocal = Local<State, Conditions>;
  type TemperatureLocal = Local<State, Temperature>;

  interface Attrs {
    state: State;
    actions: Actions;
  }

  interface SkyOptionAttrs extends Attrs {
    local: ConditionsLocal;
    value: string;
    label: string;
  }

  interface ConditionsAttrs extends Attrs {
    local: ConditionsLocal;
  }

  interface TemperatureAttrs extends Attrs {
    local: TemperatureLocal;
  }

  const nest = meiosis.mergerino.nest;

  const conditions: ConditionsComponent<Patch> = {
    initial: initialConditions,
    Actions: (update: Update) => ({
      togglePrecipitations: (local, value) => {
        update(local.patch({ precipitations: value }));
      },
      changeSky: (local, value) => {
        update(local.patch({ sky: value }));
      }
    })
  };

  const SkyOption: m.Component<SkyOptionAttrs> = {
    view: ({ attrs: { state, local, actions, value, label } }) =>
      m(
        "label",
        m("input", {
          type: "radio",
          value,
          checked: local.get(state).sky === value,
          // FIXME: evt type
          onchange: evt => actions.conditions.changeSky(local, evt.target.value)
        }),
        label
      )
  };

  const Conditions: m.Component<ConditionsAttrs> = {
    view: ({ attrs: { state, local, actions } }) =>
      m(
        "div",
        m(
          "label",
          m("input", {
            type: "checkbox",
            checked: local.get(state).precipitations,
            onchange: evt => actions.conditions.togglePrecipitations(local, evt.target.checked)
          }),
          "Precipitations"
        ),
        m(
          "div",
          m(SkyOption, { state, local, actions, value: "SUNNY", label: "Sunny" }),
          m(SkyOption, { state, local, actions, value: "CLOUDY", label: "Cloudy" }),
          m(SkyOption, { state, local, actions, value: "MIX", label: "Mix of sun/clouds" })
        )
      )
  };

  const temperature: TemperatureComponent<Patch> = {
    Initial: InitialTemperature,
    Actions: update => ({
      increment: (local, amount) => {
        update(local.patch({ value: x => x + amount }));
      },
      changeUnits: local => {
        update(
          local.patch(state => {
            const value = state.value;
            const newUnits = state.units === "C" ? "F" : "C";
            const newValue = convert(value, newUnits);
            return { ...state, value: newValue, units: newUnits };
          })
        );
      }
    })
  };

  const Temperature: m.Component<TemperatureAttrs> = {
    view: ({ attrs: { state, local, actions } }) =>
      m(
        "div",
        local.get(state).label,
        " Temperature: ",
        local.get(state).value,
        m.trust("&deg;"),
        local.get(state).units,
        m(
          "div",
          m("button", { onclick: () => actions.temperature.increment(local, 1) }, "Increment"),
          m("button", { onclick: () => actions.temperature.increment(local, -1) }, "Decrement")
        ),
        m(
          "div",
          m("button", { onclick: () => actions.temperature.changeUnits(local) }, "Change Units")
        )
      )
  };

  const app: App<State, Patch, Actions> = {
    initial: {
      conditions: conditions.initial,
      temperature: {
        air: temperature.Initial("Air"),
        water: temperature.Initial("Water")
      }
    },
    Actions: update => ({
      conditions: conditions.Actions(update),
      temperature: temperature.Actions(update)
    })
  };

  const App: m.Component<Attrs> = {
    view: ({ attrs: { state, actions } }) =>
      m(
        "div",
        { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
        m(
          "div",
          m(Conditions, { state, local: nest("conditions") as ConditionsLocal, actions }),
          m(Temperature, {
            state,
            local: nest(["temperature", "air"]) as TemperatureLocal,
            actions
          }),
          m(Temperature, {
            state,
            local: nest(["temperature", "water"]) as TemperatureLocal,
            actions
          })
        ),
        m("pre", { style: { margin: "0" } }, JSON.stringify(state, null, 4))
      )
  };

  const stream = {
    stream: (value?: any) => MStream(value),
    scan: (acc: any, init: any, stream: any) => MStream.scan(acc, init, stream)
  };

  const { states, actions } = meiosis.mergerino.setup<State, Actions>({ stream, merge, app });

  m.mount(document.getElementById("mithrilApp") as HTMLElement, {
    view: () => m(App, { state: states(), actions })
  });

  states.map(() => m.redraw());
})();

// preact + mergerino + simple-stream
(() => {
  type Patch = MergerinoPatch<State>;
  type Update = Stream<Patch>;
  type ConditionsLocal = Local<State, Conditions>;
  type TemperatureLocal = Local<State, Temperature>;

  interface Attrs {
    state: State;
    actions: Actions;
  }

  interface SkyOptionAttrs extends Attrs {
    local: ConditionsLocal;
    value: string;
    label: string;
  }

  interface ConditionsAttrs extends Attrs {
    local: ConditionsLocal;
  }

  interface TemperatureAttrs extends Attrs {
    local: TemperatureLocal;
  }

  const nest = meiosis.mergerino.nest;

  const conditions: ConditionsComponent<Patch> = {
    initial: initialConditions,
    Actions: (update: Update) => ({
      togglePrecipitations: (local, value) => {
        update(local.patch({ precipitations: value }));
      },
      changeSky: (local, value) => {
        update(local.patch({ sky: value }));
      }
    })
  };

  // Normally we could use JSX with the Preact.h pragma, but since we already have React in this
  // file, we'll use h here.
  const SkyOption: (attrs: SkyOptionAttrs) => VNode = ({ state, local, actions, value, label }) =>
    h(
      "label",
      {},
      h("input", {
        type: "radio",
        value,
        checked: local.get(state).sky === value,
        onchange: evt => actions.conditions.changeSky(local, evt.target.value)
      }),
      label
    );

  const Conditions: (attrs: ConditionsAttrs) => VNode = ({ state, local, actions }) =>
    h(
      "div",
      {},
      h(
        "label",
        {},
        h("input", {
          type: "checkbox",
          checked: local.get(state).precipitations,
          onchange: evt => actions.conditions.togglePrecipitations(local, evt.target.checked)
        }),
        "Precipitations"
      ),
      h(
        "div",
        {},
        h(SkyOption, { state, local, actions, value: "SUNNY", label: "Sunny" }),
        h(SkyOption, { state, local, actions, value: "CLOUDY", label: "Cloudy" }),
        h(SkyOption, { state, local, actions, value: "MIX", label: "Mix of sun/clouds" })
      )
    );

  const temperature: TemperatureComponent<Patch> = {
    Initial: InitialTemperature,
    Actions: update => ({
      increment: (local, amount) => {
        update(local.patch({ value: x => x + amount }));
      },
      changeUnits: local => {
        update(
          local.patch(state => {
            const value = state.value;
            const newUnits = state.units === "C" ? "F" : "C";
            const newValue = convert(value, newUnits);
            return { ...state, value: newValue, units: newUnits };
          })
        );
      }
    })
  };

  const Temperature: (attrs: TemperatureAttrs) => VNode = ({ state, local, actions }) =>
    h(
      "div",
      {},
      local.get(state).label,
      " Temperature: ",
      local.get(state).value,
      h("span", { dangerouslySetInnerHTML: { __html: "&deg;" } }),
      local.get(state).units,
      h(
        "div",
        {},
        h("button", { onclick: () => actions.temperature.increment(local, 1) }, "Increment"),
        h("button", { onclick: () => actions.temperature.increment(local, -1) }, "Decrement")
      ),
      h(
        "div",
        {},
        h("button", { onclick: () => actions.temperature.changeUnits(local) }, "Change Units")
      )
    );

  const app: App<State, Patch, Actions> = {
    initial: {
      conditions: conditions.initial,
      temperature: {
        air: temperature.Initial("Air"),
        water: temperature.Initial("Water")
      }
    },
    Actions: update => ({
      conditions: conditions.Actions(update),
      temperature: temperature.Actions(update)
    })
  };

  const Root: (attrs: Attrs) => VNode = ({ state, actions }) =>
    h(
      "div",
      { style: { display: "grid", gridTemplateColumns: "1fr 1fr" } },
      h(
        "div",
        {},
        h(Conditions, { state, local: nest("conditions") as ConditionsLocal, actions }),
        h(Temperature, { state, local: nest(["temperature", "air"]) as TemperatureLocal, actions }),
        h(Temperature, {
          state,
          local: nest(["temperature", "water"]) as TemperatureLocal,
          actions
        })
      ),
      h("pre", { style: { margin: "0" } }, JSON.stringify(state, null, 4))
    );

  const App = meiosis.preact.setup<State, Attrs, VNode>({ h, useState, Root });

  const { states, update, actions } = meiosis.mergerino.setup<State, Actions>({
    stream: meiosis.simpleStream,
    merge,
    app
  });
  // Just testing TypeScript support here.
  const _test = meiosis.simpleStream.stream<number>();
  const _init = _test();
  _test(5);
  update({ temperature: { air: { value: 21 } } });
  update({ temperature: { air: { value: x => x + 1 } } });
  update({ temperature: { air: { value: () => 21 } } });

  const element = document.getElementById("preactApp") as HTMLElement;
  preactRender(h(App, { states, actions }), element);
})();

// react + immer + flyd
(() => {
  type Patch = ImmerPatch<State>;
  type Update = Stream<Patch>;
  type ConditionsLocal = Local<State, Conditions>;
  type TemperatureLocal = Local<State, Temperature>;

  interface Attrs {
    state: State;
    actions: Actions;
  }

  interface SkyOptionAttrs extends Attrs {
    local: ConditionsLocal;
    value: string;
    label: string;
  }

  interface ConditionsAttrs extends Attrs {
    local: ConditionsLocal;
  }

  interface TemperatureAttrs extends Attrs {
    local: TemperatureLocal;
  }

  const nest = meiosis.immer.nest(produce);

  const conditions: ConditionsComponent<Patch> = {
    initial: initialConditions,
    Actions: (update: Update) => ({
      togglePrecipitations: (local, value) => {
        update(
          local.patch(state => {
            state.precipitations = value;
          })
        );
      },
      changeSky: (local, value) => {
        update(
          local.patch(state => {
            state.sky = value;
          })
        );
      }
    })
  };

  const SkyOption: (attrs: SkyOptionAttrs) => ReactElement = ({
    state,
    local,
    actions,
    value,
    label
  }) => (
    <label>
      <input
        type="radio"
        value={value}
        checked={local.get(state).sky === value}
        onChange={evt => actions.conditions.changeSky(local, evt.target.value)}
      />
      {label}
    </label>
  );

  const Conditions: (attrs: ConditionsAttrs) => ReactElement = ({ state, local, actions }) => (
    <div>
      <label>
        <input
          type="checkbox"
          checked={local.get(state).precipitations}
          onChange={evt => actions.conditions.togglePrecipitations(local, evt.target.checked)}
        />
        Precipitations
      </label>
      <div>
        <SkyOption state={state} local={local} actions={actions} value="SUNNY" label="Sunny" />
        <SkyOption state={state} local={local} actions={actions} value="CLOUDY" label="Cloudy" />
        <SkyOption
          state={state}
          local={local}
          actions={actions}
          value="MIX"
          label="Mix of sun/clouds"
        />
      </div>
    </div>
  );

  const temperature: TemperatureComponent<Patch> = {
    Initial: InitialTemperature,
    Actions: update => ({
      increment: (local, amount) => {
        update(
          local.patch(state => {
            state.value += amount;
          })
        );
      },
      changeUnits: local => {
        update(
          local.patch(state => {
            const value = state.value;
            const newUnits = state.units === "C" ? "F" : "C";
            const newValue = convert(value, newUnits);
            state.value = newValue;
            state.units = newUnits;
          })
        );
      }
    })
  };

  const Temperature: (attrs: TemperatureAttrs) => ReactElement = ({ state, local, actions }) => (
    <div>
      {local.get(state).label} Temperature:
      {local.get(state).value}&deg;{local.get(state).units}
      <div>
        <button onClick={() => actions.temperature.increment(local, 1)}>Increment</button>
        <button onClick={() => actions.temperature.increment(local, -1)}>Decrement</button>
      </div>
      <div>
        <button onClick={() => actions.temperature.changeUnits(local)}>Change Units</button>
      </div>
    </div>
  );

  const app: App<State, Patch, Actions> = {
    initial: {
      conditions: conditions.initial,
      temperature: {
        air: temperature.Initial("Air"),
        water: temperature.Initial("Water")
      }
    },
    Actions: update => ({
      conditions: conditions.Actions(update),
      temperature: temperature.Actions(update)
    })
  };

  const Root: (attrs: Attrs) => ReactElement = ({ state, actions }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <Conditions state={state} local={nest("conditions") as ConditionsLocal} actions={actions} />
        <Temperature
          state={state}
          local={nest(["temperature", "air"]) as TemperatureLocal}
          actions={actions}
        />
        <Temperature
          state={state}
          local={nest(["temperature", "water"]) as TemperatureLocal}
          actions={actions}
        />
      </div>
      <pre style={{ margin: "0" }}>{JSON.stringify(state, null, 4)}</pre>
    </div>
  );

  const stream = {
    stream: (value?: any) => flyd.stream(value),
    scan: (acc: any, init: any, stream: any) => flyd.scan(acc, init, stream)
  };

  const { states, actions } = meiosis.immer.setup<State, Actions>({
    stream,
    produce: (s, p) => produce(s, p),
    app
  });

  const App = meiosis.react.setup<State, Attrs, ReactElement>({ React, Root });

  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states, actions }), element);
})();

// MeiosisOne + mergerino + mithril + mithril-stream
(() => {
  type MeiosisOneSubState<T> = MergerinoMeiosisOne<State, T>;

  interface Attrs {
    context: MergerinoMeiosisOne<State>;
  }

  interface ConditionsActions {
    togglePrecipitations: (context: MeiosisOneSubState<Conditions>, value: boolean) => void;
    changeSky: (context: MeiosisOneSubState<Conditions>, value: Sky) => void;
  }

  interface ConditionsComponent {
    initial: Conditions;
    actions: ConditionsActions;
  }

  interface SkyOptionAttrs {
    context: MeiosisOneSubState<Conditions>;
    value: string;
    label: string;
  }

  interface ConditionsAttrs {
    context: MeiosisOneSubState<Conditions>;
  }

  interface TemperatureActions {
    increment: (context: MeiosisOneSubState<Temperature>, amount: number) => void;
    changeUnits: (context: MeiosisOneSubState<Temperature>) => void;
  }

  interface TemperatureComponent {
    Initial: (label: string) => Temperature;
    actions: TemperatureActions;
  }

  interface TemperatureAttrs {
    context: MeiosisOneSubState<Temperature>;
  }

  const conditions: ConditionsComponent = {
    initial: initialConditions,
    actions: {
      togglePrecipitations: (context, value: boolean) => {
        context.update({ precipitations: value });
      },
      changeSky: (context, value: Sky) => {
        context.update({ sky: value });
      }
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
          onchange: evt => conditions.actions.changeSky(context, evt.target.value)
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
            onchange: evt => conditions.actions.togglePrecipitations(context, evt.target.checked)
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
    Initial: InitialTemperature,
    actions: {
      increment: (context, amount) => {
        context.update({ value: x => x + amount });
      },
      changeUnits: context => {
        context.update(state => {
          const value = state.value;
          const newUnits = state.units === "C" ? "F" : "C";
          const newValue = convert(value, newUnits);
          return { ...state, value: newValue, units: newUnits };
          // TODO: check if there is a way to signal an error on extra properties
        });
      }
    }
  };

  const Temperature: m.Component<TemperatureAttrs> = {
    view: ({ attrs: { context } }) => {
      const state = context.getState();

      return m(
        "div",
        state.label,
        " Temperature: ",
        state.value,
        m.trust("&deg;"),
        state.units,
        m(
          "div",
          m("button", { onclick: () => temperature.actions.increment(context, 1) }, "Increment"),
          m("button", { onclick: () => temperature.actions.increment(context, -1) }, "Decrement")
        ),
        m(
          "div",
          m("button", { onclick: () => temperature.actions.changeUnits(context) }, "Change Units")
        )
      );
    }
  };

  const app: MergerinoMeiosisOneApp<State> = {
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
          m(Conditions, { context: context.nest("conditions") }),
          m(Temperature, { context: context.nest("temperature").nest("air") }),
          m(Temperature, { context: context.nest("temperature").nest("water") })
        ),
        m("pre", { style: { margin: "0" } }, JSON.stringify(context.getState(), null, 4))
      )
  };

  const stream = {
    stream: (value?: any) => MStream(value),
    scan: (acc: any, init: any, stream: any) => MStream.scan(acc, init, stream)
  };

  const context = meiosis.mergerino.meiosisOne<State>({ stream, merge, app });

  m.mount(document.getElementById("mergerinoMeiosisOneApp") as HTMLElement, {
    view: () => m(App, { context })
  });

  context.states.map(() => m.redraw());
})();
*/
