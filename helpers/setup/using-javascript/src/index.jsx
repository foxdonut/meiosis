// @ts-check

import meiosis from "../../source/dist/index";
import flyd from "flyd";
import produce from "immer";
import merge from "mergerino";
import { html, render as litHtmlRender } from "lit-html";
import m from "mithril";
import Stream from "mithril/stream";
import { h, render as preactRender } from "preact";
import { useState } from "preact/hooks";
import React from "react";
import ReactDOM from "react-dom";

// lit-html + functionPatches + simple-stream
(() => {
  const { states, update, actions } = meiosis.functionPatches.setup({
    stream: meiosis.simpleStream,
    app: {
      initial: { counter: 0 },
      Actions: update => ({
        increment: () => update(state => ({ ...state, counter: state.counter + 1 }))
      })
    }
  });

  const App = ({ state, update, actions }) => html`
    <div>
      <div>Counter: ${state.counter}</div>
      <div>Greeting: ${state.greeting}</div>
      <div>
        <button @click=${() => actions.increment()}>Increment</button>
      </div>
      <div>
        <button @click=${() => update(state => ({ ...state, greeting: "Hello" }))}>
          Say Hello
        </button>
      </div>
    </div>
  `;

  const element = document.getElementById("litHtmlApp");
  states.map(state => litHtmlRender(App({ state, update, actions }), element));
})();

// mithril + mergerino + mithril-stream
(() => {
  const stream = {
    stream: Stream,
    scan: (acc, init, stream) => Stream.scan(acc, init, stream)
  };

  const { states, update, actions } = meiosis.mergerino.setup({
    stream,
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

  const App = {
    view: ({ attrs: { state, update, actions } }) =>
      m(
        "div",
        m("div", "Counter: ", state.counter),
        m("div", "Greeting: ", state.greeting),
        m("div", m("button", { onclick: () => actions.increment() }, "Increment")),
        m("div", m("button", { onclick: () => update({ greeting: "Hello" }) }, "Say Hello"))
      )
  };

  m.mount(document.getElementById("mithrilApp"), {
    view: () => m(App, { state: states(), update, actions })
  });

  states.map(() => m.redraw());
})();

// preact + mergerino + simple-stream
(() => {
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

  // Normally we could use JSX with the Preact.h pragma, but since we already have React in this
  // file, we'll use h here.
  const Root = ({ state, update, actions }) =>
    h(
      "div",
      {},
      h("div", {}, "Counter: ", state.counter),
      h("div", {}, "Greeting: ", state.greeting),
      h("div", {}, h("button", { onClick: () => actions.increment() }, "Increment")),
      h("div", {}, h("button", { onClick: () => update({ greeting: "Hello" }) }, "Say Hello"))
    );

  const App = meiosis.preact.setup({ h, useState, Root });

  const element = document.getElementById("preactApp");
  preactRender(h(App, { states, update, actions }), element);
})();

// react + immer + flyd
(() => {
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

  const element = document.getElementById("reactApp");
  ReactDOM.render(React.createElement(App, { states, update, actions }), element);
})();
