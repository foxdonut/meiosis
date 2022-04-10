# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## The Meiosis Pattern Cheatsheet

> **Helper functions!** Meiosis is a pattern that you can set up yourself, but by popular demand
[meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup#meiosis-setup) is now available
for your convenience.

This is a quick summary of the Meiosis Pattern:

- Separate state management code from view code.
- Use a simple stream library such as [flyd](https://github.com/paldepind/flyd),
[simpleStream from meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup#meiosis-setup),
or, if you're using Mithril, [Mithril Stream](https://mithril.js.org/stream.html).
- Start with an initial state.
- Create an `update` stream of **patches**.
- Patches can be
[Mergerino](https://meiosis.js.org/docs/05-meiosis-with-mergerino.html) patches,
[Function Patches](https://meiosis.js.org/docs/04-meiosis-with-function-patches.html),
or your own patches.
- Create an `actions` object of functions that issue patches onto the `update` stream.
- Create a `states` stream by using `scan` on the `update` stream with the initial state, and
`merge` for Mergerino, or `(state, patch) => patch(state)` for function patches.
- Pass `state` and `actions` to views (see below for details.)

Here is the code to set up the Meiosis Pattern:

```javascript
const app = {
  initial: ...,
  Actions: (update, getState) => {
    return ...
  }
};

const update = stream();

// Using Mergerino:
const states = scan(merge, app.initial, update);

// Using Function Patches:
const states = scan((state, patch) => patch(state), app.initial, update);

const actions = app.Actions(update, states);
```

Then, pass `state` and `actions` to views.

Optionally, add [Services and Effects](services-and-effects.html):

```javascript
const app = {
  initial: ...,
  Actions: (update, getState) => {
    return ...
  },
  // services are state => patch
  services: [...],
  // effects are state => {
  //   call update(...) or actions.someAction(...);
  // }
  Effects: (update, actions) => [...]
}

// Using Mergerino:
const accumulator = merge;

// Using Function Patches:
const accumulator = (state, patch) => patch ? patch(state) : state;

const update = stream();

const runServices = startingState =>
  app.services.reduce(
    (state, service) => accumulator(state, service(state)),
    startingState
  );

const states = scan(
  (state, patch) => runServices(accumulator(state, patch)),
  runServices(app.initial),
  update
);

const actions = app.Actions(update, states);
const effects = app.Effects(update, actions);

states.map(state => effects.forEach(effect => effect(state)));
```

Next, wire up your view.

<a name="using_mithril"></a>
### [Using Mithril](#using_mithril)

```javascript
const App = {
  view: function({ attrs: { state, actions } }) {
    // render view according to state, call actions to trigger changes
    // pass { state, actions } to other components.
  }
};

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});

states.map(() => m.redraw());
```

<a name="using_react"></a>
### [Using React](#using_react)

```javascript
import React from "react";

const App = ({ states, actions }) => {
  const [init, setInit] = React.useState(false);
  const [state, setState] = React.useState(states());

  if (!init) {
    setInit(true);
    states.map(setState);
  }

  // render view according to state, call actions to trigger changes
  // pass state={state} actions={actions} to other components.
  return (<div>...</div>);
};

ReactDOM.render(<App states={states} actions={actions} />,
  document.getElementById("app"));
```

<a name="using_preact"></a>
### [Using Preact](#using_preact)

```javascript
import { useState } from "preact/hooks";

const App = ({ state, actions }) => {
  const [init, setInit] = useState(false);
  const [state, setState] = useState(states());

  if (!init) {
    setInit(true);
    states.map(setState);
  }

  // render view according to state, call actions to trigger changes
  // pass state={state} actions={actions} to other components.
  return (<div>...</div>);
};

preact.render(<App states={states} actions={actions} />,
  document.getElementById("app"));
```

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](https://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
