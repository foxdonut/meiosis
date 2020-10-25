// @ts-check

import meiosis from "../../../source/dist/index";
import merge from "mergerino";
import { h, render } from "preact";
import { useState } from "preact/hooks";

const { states, update, actions } = meiosis.mergerino.setup({
  stream: meiosis.simpleStream,
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

const Root = ({ state, update, actions }) => (
  <div>
    <div>Counter: {state.counter}</div>
    <div>Greeting: {state.greeting}</div>
    <div>
      <button onClick={() => actions.increment()}>Increment</button>
    </div>
    <div>
      <button onClick={() => update({ greeting: "Hello" })}>Say Hello</button>
    </div>
  </div>
);

const App = meiosis.preact.setup({ h, useState, Root });

const element = document.getElementById("app");
render(<App states={states} update={update} actions={actions} />, element);
