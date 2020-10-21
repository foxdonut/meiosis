// @ts-check

import meiosis from "../../../dist/index";
import { html, render } from "lit-html";

const App = ({ state, update, actions }) => html`
  <div>
    <div>Counter: ${state.counter}</div>
    <div>Greeting: ${state.greeting}</div>
    <div>
      <button @click=${() => actions.increment()}>Increment</button>
    </div>
    <div>
      <button @click=${() => update(state => ({ ...state, greeting: "Hello" }))}>Say Hello</button>
    </div>
  </div>
`;

const { states, update, actions } = meiosis.functionPatches.setup({
  stream: meiosis.simpleStream,
  app: {
    initial: { counter: 0 },
    Actions: update => ({
      increment: () => update(state => ({ ...state, counter: state.counter + 1 }))
    })
  }
});

const element = document.getElementById("app");
states.map(state => render(App({ state, update, actions }), element));
