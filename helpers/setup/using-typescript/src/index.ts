import meiosis, { Stream } from "meiosis-setup";
import { stream, scan } from "meiosis-setup/simple-stream";
import merge from "mergerino";
import m from "mithril";
import flyd from "flyd";
import MStream from "mithril/stream";
import produce from "immer";
import { html, render, TemplateResult } from "lit-html";

// simple-stream
(() => {
  const s = stream(0);
  const y = scan((x, y) => x + y, 0, s);
  y.map(x => x);
})();

// lit-html + functionPatches
(() => {
  interface State {
    counter: number;
    greeting?: string;
  }

  interface Actions {
    increment: (value: number) => void;
  }

  interface Attrs {
    state: State;
    update: Stream<any>;
    actions: Actions;
  }

  const { states, update, actions } = meiosis.functionPatches.setup<State, Actions>({
    stream: meiosis.simpleStream,
    app: {
      initial: { counter: 0 },
      Actions: update => ({
        increment: (amount: number) =>
          update(state => ({ ...state, counter: state.counter + amount }))
      })
    }
  });

  const App: (attrs: Attrs) => TemplateResult = ({ state, update, actions }) => html`
    <div>
      <div>Counter: ${state.counter}</div>
      <div>Greeting: ${state.greeting}</div>
      <div>
        <button @click=${() => actions.increment(2)}>Increment</button>
      </div>
      <div>
        <button @click=${() => update(state => ({ ...state, greeting: "Hello" }))}>
          Say Hello
        </button>
      </div>
    </div>
  `;

  const element = document.getElementById("litHtmlApp") as HTMLElement;
  states.map(state => render(App({ state, update, actions }), element));
})();

// mithril-stream, functionPatches, mithril
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

  const { states, update, actions } = meiosis.functionPatches.setup({
    stream,
    app: {
      initial,
      Actions: update => ({
        increment: (amount: number) =>
          update(state => ({ ...state, counter: state.counter + amount }))
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
        m(
          "div",
          m(
            "button",
            { onclick: () => update(state => ({ ...state, greeting: "Hello" })) },
            "Say Hello"
          )
        )
      )
  };

  m.mount(document.getElementById("mithrilApp") as HTMLElement, {
    view: () => m(App, { state: states(), update, actions })
  });

  states.map(() => m.redraw());
})();

// flyd, mergerino
(() => {
  const stream = {
    stream: value => flyd.stream(value),
    scan: (acc, init, stream) => flyd.scan(acc, init, stream)
  };

  const { states, update, actions } = meiosis.mergerino.setup({
    stream,
    merge,
    app: {
      initial: { counter: 0 },
      Actions: update => ({
        increment: () => update({ counter: value => value + 1 })
      })
    }
  });

  console.log(states, update, actions);
})();

// simple-stream, immer
(() => {
  interface State {
    counter: number;
    greeting?: string;
  }

  const initial: State = {
    counter: 0
  };

  const { states, update, actions } = meiosis.immer.setup({
    stream: meiosis.simpleStream,
    produce: (s, p) => produce(s, p),
    app: {
      initial,
      Actions: update => ({
        increment: (amount: number) =>
          update(state => {
            state.counter += amount;
            state.greeting = "hello";
          })
      })
    }
  });

  actions.increment(42);

  console.log(states, update, actions);
})();
