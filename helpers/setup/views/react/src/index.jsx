// @ts-check

import meiosis from "../../../source/dist/index";
import flyd from "flyd";
import produce from "immer";
import React from "react";
import ReactDOM from "react-dom";

const Root = ({ state, update, actions }) => (
  <div>
    <div>Counter: {state.counter}</div>
    <div>Greeting: {state.greeting}</div>
    <div>
      <button onClick={() => actions.increment()}>Increment</button>
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

const App = meiosis.react.setup({ React, Root });

const { states, update, actions } = meiosis.immer.setup({
  stream: flyd,
  produce: (s, p) => produce(s, p),
  app: {
    initial: { counter: 0 },
    Actions: update => ({
      increment: () => {
        update(state => {
          state.counter++;
        });
      }
    })
  }
});

const element = document.getElementById("app");
ReactDOM.render(React.createElement(App, { states, update, actions }), element);
