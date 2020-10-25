import meiosis from "meiosis-setup";
import { stream, scan } from "meiosis-setup/simple-stream";
import merge from "mergerino";
import m from "mithril";
import flyd from "flyd";
import Stream from "mithril/stream";
import produce from "immer";

const s = stream(0);
const y = scan((x, y) => x + y, 0, s);
y.map(x => x);

const App = {
  view: ({ attrs: { state, update, actions } }) =>
    m(
      "div",
      m("div", "Counter: ", state.counter),
      m("div", "Greeting: ", state.greeting),
      m("div", m("button", { onclick: () => actions.increment() }, "Increment")),
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

const { states, update, actions } = meiosis.functionPatches.setup({
  stream: meiosis.simpleStream,
  app: {
    initial: { counter: 0 },
    Actions: update => ({
      increment: () => update(state => ({ ...state, counter: state.counter + 1 }))
    })
  }
});

m.mount(document.getElementById("app") as HTMLElement, {
  view: () => m(App, { state: states(), update, actions })
});

states.map(() => m.redraw());

(() => {
  const stream = {
    stream: v => flyd.stream(v),
    scan: (a, i, s) => flyd.scan(a, i, s)
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

(() => {
  const stream = {
    stream: v => Stream(v),
    scan: (a, i, s) => Stream.scan(a, i, s)
  };

  const { states, update, actions } = meiosis.immer.setup({
    stream,
    produce: (s, p) => produce(s, p),
    app: {
      initial: { counter: 0 },
      Actions: update => ({
        increment: () =>
          update(state => {
            state.counter++;
          })
      })
    }
  });

  console.log(states, update, actions);
})();
