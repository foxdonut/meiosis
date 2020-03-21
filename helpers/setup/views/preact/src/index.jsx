import meiosis from "../../../dist/meiosis-setup";
import { h, Component, render } from "preact";

const Root = ({ state, update, actions }) => (
  <div>
    <div>Counter: {state.counter}</div>
    <div>Greeting: {state.greeting}</div>
    <div>
      <button onClick={() => actions.increment()}>Increment</button>
    </div>
    <div>
      <button onClick={() => update(state => ({ ...state, greeting: "Hello" }))}>Say Hello</button>
    </div>
  </div>
);

const App = meiosis.preact.setup({ h, Component, Root });

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
render(<App states={states} update={update} actions={actions} />, element);
