import meiosis from "../../../dist/meiosis-setup";
import m from "mithril";

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

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), update, actions })
});
