// @ts-check

import meiosis from "../../../source/dist/index";
import merge from "mergerino";
import m from "mithril";
import Stream from "mithril/stream";

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
          { onclick: () => update({ greeting: "Hello" }) },
          "Say Hello"
        )
      )
    )
};

const { states, update, actions } = meiosis.mergerino.setup({
  stream: Stream,
  merge,
  app: {
    initial: { counter: 0 },
    Actions: update => ({
      increment: () => {
        update({ counter: value => value + 1 });
      }
    })
  }
});

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), update, actions })
});

states.map(() => m.redraw());
