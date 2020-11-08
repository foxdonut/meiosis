import meiosis, {
  ActionConstructor,
  App,
  FunctionPatch,
  ImmerPatch,
  LocalPatch,
  Stream
} from "meiosis-setup";
import { stream, scan } from "meiosis-setup/simple-stream";
import flyd from "flyd";
import merge from "mergerino";
import produce from "immer";
import { html, render as litHtmlRender, TemplateResult } from "lit-html";
import m from "mithril";
import MStream from "mithril/stream";
import { h, render as preactRender } from "preact";
import { useState } from "preact/hooks";
import React from "react";
import ReactDOM from "react-dom";

// simple-stream
(() => {
  const s = stream(0);
  const y = scan((x, y) => x + y, 0, s);
  y.map(x => x);
})();

// common code
type Sky = "SUNNY" | "CLOUDY" | "MIX";

interface Conditions {
  precipitations: boolean;
  sky: Sky;
}

interface ConditionsActions<P1, P2> {
  togglePrecipitations: (local: LocalPatch<P1, P2>, value: boolean) => void;
  changeSky: (local: LocalPatch<P1, P2>, value: Sky) => void;
}

interface ConditionsComponent<P1, P2> {
  initial: Conditions;
  Actions: ActionConstructor<Conditions, P1, ConditionsActions<P1, P2>>;
}

type TemperatureUnits = "C" | "F";

interface Temperature {
  label: string;
  value: number;
  units: TemperatureUnits;
}

interface TemperatureActions<P1, P2> {
  increment: (local: LocalPatch<P1, P2>, amount: number) => void;
  changeUnits: (local: LocalPatch<P1, P2>) => void;
}

interface TemperatureComponent<P1, P2> {
  Initial: (label: string) => Temperature;
  Actions: ActionConstructor<Temperature, P1, TemperatureActions<P1, P2>>;
}

interface State {
  conditions: Conditions;
  temperature: {
    air: Temperature;
    water: Temperature;
  };
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
  type Patch = FunctionPatch<State>;
  type ConditionsPatch = FunctionPatch<Conditions>;
  type TemperaturePatch = FunctionPatch<Temperature>;
  type Update = Stream<Patch>;

  interface Actions {
    conditions: ConditionsActions<Patch, ConditionsPatch>;
    temperature: TemperatureActions<Patch, TemperaturePatch>;
  }

  interface Attrs {
    state: State;
    actions: Actions;
  }

  const nest = meiosis.functionPatches.nest;

  const conditions: ConditionsComponent<Patch, ConditionsPatch> = {
    initial: initialConditions,
    Actions: (update: Update) => ({
      togglePrecipitations: (local, value) => {
        update(local.patch(state => ({ ...state, precipitations: value })));
      },
      changeSky: (local, value) => {
        update(local.patch(state => ({ ...state, sky: value })));
      }
    })
  };

  const skyOption = ({ state, local, actions, value, label }) => html`
    <label>
      <input
        type="radio"
        value=${value}
        .checked=${local.get(state).sky === value}
        @change=${evt => actions.conditions.changeSky(local, evt.target.value)}
      />
      ${label}
    </label>
  `;

  const Conditions = ({ state, local, actions }) => html`
    <div>
      <label>
        <input
          type="checkbox"
          .checked=${local.get(state).precipitations}
          @change=${evt => actions.conditions.togglePrecipitations(local, evt.target.checked)}
        />
        Precipitations
      </label>
      <div>
        ${skyOption({ state, local, actions, value: "SUNNY", label: "Sunny" })}
        ${skyOption({ state, local, actions, value: "CLOUDY", label: "Cloudy" })}
        ${skyOption({ state, local, actions, value: "MIX", label: "Mix of sun/clouds" })}
      </div>
    </div>
  `;

  const temperature: TemperatureComponent<Patch, TemperaturePatch> = {
    Initial: InitialTemperature,
    Actions: update => ({
      increment: (local, amount) => {
        update(local.patch(state => ({ ...state, value: state.value + amount })));
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

  const Temperature = ({ state, local, actions }) => html`
    <div>
      ${local.get(state).label} Temperature: ${local.get(state).value}&deg;${local.get(state).units}
      <div>
        <button @click=${() => actions.temperature.increment(local, 1)}>Increment</button>
        <button @click=${() => actions.temperature.increment(local, -1)}>Decrement</button>
      </div>
      <div>
        <button @click=${() => actions.temperature.changeUnits(local)}>Change Units</button>
      </div>
    </div>
  `;

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

  const App: (attrs: Attrs) => TemplateResult = ({ state, actions }) => html`
    <div style="display: grid; grid-template-columns: 1fr 1fr">
      <div>
        ${Conditions({ state, local: nest("conditions"), actions })}
        ${Temperature({ state, local: nest(["temperature", "air"]), actions })}
        ${Temperature({ state, local: nest(["temperature", "water"]), actions })}
      </div>
      <pre style="margin: 0">${JSON.stringify(state, null, 4)}</pre>
    </div>
  `;

  const { states, actions } = meiosis.functionPatches.setup<State, Actions>({
    stream: meiosis.simpleStream,
    app
  });

  const element = document.getElementById("litHtmlApp") as HTMLElement;
  states.map(state => litHtmlRender(App({ state, actions }), element));
})();

// mithril + mergerino + mithril-stream
(() => {
  const stream = {
    stream: value => MStream(value),
    scan: (acc, init, stream) => MStream.scan(acc, init, stream)
  };

  interface State {
    counter: number;
    greeting?: string;
  }

  const initial: State = {
    counter: 0
  };

  const { states, update, actions } = meiosis.mergerino.setup({
    stream,
    merge,
    app: {
      initial,
      Actions: update => ({
        increment: (amount: number) => update({ counter: value => value + amount })
      })
    }
  });

  interface Attrs {
    state: State;
    update: typeof update;
    actions: typeof actions;
  }

  const App: m.Component<Attrs> = {
    view: ({ attrs: { state, update, actions } }) =>
      m(
        "div",
        m("div", "Counter: ", state.counter),
        m("div", "Greeting: ", state.greeting),
        m("div", m("button", { onclick: () => actions.increment(2) }, "Increment")),
        m("div", m("button", { onclick: () => update({ greeting: "Hello" }) }, "Say Hello"))
      )
  };

  m.mount(document.getElementById("mithrilApp") as HTMLElement, {
    view: () => m(App, { state: states(), update, actions })
  });

  states.map(() => m.redraw());
})();

// preact + mergerino + simple-stream
(() => {
  /*
  interface FixedState {
    counter: number;
    greeting?: string;
  }

  interface DynamicState {
    [key: string]: string;
  }

  type State = FixedState & DynamicState;

  type MergerinoPatch = {
    [K in keyof State]: State[K] | ((a: State[K]) => State[K]);
  }

  const p1: MergerinoPatch = { counter: x => x + 1, greeting: "hi", another: "yes" };
  console.log(p1);
  */

  interface State {
    counter: number;
    greeting?: string;
  }

  // Mergerino patch type would be something like
  // Object | function (State => State)
  // Object with key in state and value is same type, either a value or a function Type => Type

  interface Actions {
    increment: (value: number) => void;
  }

  interface Attrs {
    state: State;
    update: Stream<any>;
    actions: Actions;
  }

  const { states, update, actions } = meiosis.mergerino.setup<State, Actions>({
    stream: meiosis.simpleStream,
    merge,
    app: {
      initial: { counter: 0 },
      Actions: update => ({
        increment: (amount: number) => {
          update({ counter: value => value + amount });
        }
      })
    }
  });

  // Normally we could use JSX with the Preact.h pragma, but since we already have React in this
  // file, we'll use h here.
  const Root: (attrs: Attrs) => preact.VNode = ({ state, update, actions }) =>
    h(
      "div",
      {},
      h("div", {}, "Counter: ", state.counter),
      h("div", {}, "Greeting: ", state.greeting),
      h("div", {}, h("button", { onClick: () => actions.increment(2) }, "Increment")),
      h("div", {}, h("button", { onClick: () => update({ greeting: "Hello" }) }, "Say Hello"))
    );

  const App = meiosis.preact.setup<State, any, Actions>({ h, useState, Root });

  const element = document.getElementById("preactApp") as HTMLElement;
  preactRender(h(App, { states, update, actions }), element);
})();

// react + immer + flyd
(() => {
  const stream = {
    stream: value => flyd.stream(value),
    scan: (acc, init, stream) => flyd.scan(acc, init, stream)
  };

  interface State {
    counter: number;
    greeting?: string;
  }

  interface Actions {
    increment: (value: number) => void;
  }

  interface Attrs {
    state: State;
    update: Stream<ImmerPatch<State>>;
    actions: Actions;
  }

  const { states, update, actions } = meiosis.immer.setup<State, Actions>({
    stream,
    produce: (s, p) => produce(s, p),
    app: {
      initial: { counter: 0 },
      Actions: update => ({
        increment: (amount: number) => {
          update(state => {
            state.counter += amount;
          });
        }
      })
    }
  });

  const Root: (attrs: Attrs) => JSX.Element = ({ state, update, actions }) => (
    <div>
      <div>Counter: {state.counter}</div>
      <div>Greeting: {state.greeting}</div>
      <div>
        <button onClick={() => actions.increment(2)}>Increment</button>
      </div>
      <div>
        <button
          onClick={() =>
            update(state => {
              state.greeting = "Hello";
            })
          }
        >
          Say Hello
        </button>
      </div>
    </div>
  );

  const App = meiosis.react.setup<State, ImmerPatch<State>, Actions>({ React, Root });

  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states, update, actions }), element);
})();
