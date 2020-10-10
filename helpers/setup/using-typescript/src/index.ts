import meiosis from "meiosis-setup";
import m from "mithril";
import { stream, scan } from "meiosis-setup/simple-stream";

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
