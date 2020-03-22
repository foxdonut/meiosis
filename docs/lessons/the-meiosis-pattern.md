# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## The Meiosis Pattern Cheatsheet

> IMPORTANT NOTE: For a complete explanation of the Meiosis Pattern, please see the
[Meiosis Tutorial](https://meiosis.js.org/tutorial/toc.html).

> **Helper functions!** Meiosis is a pattern that you can set up yourself, but by popular demand
[meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup) is now available
for your convenience.

This is a quick summary of the Meiosis Pattern:

- Separate state management code from view code.
- Start with an initial state.
- Create an `update` stream of **patches**.
- Patches can be
[Mergerino](https://meiosis.js.org/tutorial/05-meiosis-with-mergerino.html) patches,
[Function Patches](https://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html),
or your own patches.
- Create an `actions` object of functions that issue patches onto the `update` stream.
- Create a `states` stream by using `scan` on the `update` stream with the initial state, and
`merge` for Mergerino, or `(x, f) => f(x)` for function patches.
- Pass `state` and `actions` to views (see below for details.)

Here is the code to set up the Meiosis Pattern:

```js
const app = {
  initial: ...,
  Actions: update => {
    return ...
  }
};

const update = flyd.stream();

// Using Mergerino:
const states = flyd.scan(merge, app.initial, update);

// Using Function Patches:
const states = flyd.scan((x, f) => f(x), app.initial, update);

const actions = app.Actions(update);
```

Then, pass `state` and `actions` to views.

Optionally, add [Services](services.html).

<a name="using_mithril"></a>
### [Using Mithril](#using_mithril)

```js
const App = {
  view: function({ attrs: { state, actions } }) {
    // render view according to state, call actions to trigger changes
    // pass { state, actions } to other components.
  }
};

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), actions })
});
```

<a name="using_react"></a>
### [Using React](#using_react)

```js
const App = ({ state, actions }) => {
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

```js
const App = ({ state, actions }) => {
  const [state, setState] = useState(states());
  states.map(setState);

  // render view according to state, call actions to trigger changes
  // pass state={state} actions={actions} to other components.
  return (<div>...</div>);
};

preact.render(<App states={states} actions={actions} />,
  document.getElementById("app"));
```

<a name="using_lit_html"></a>
### [Using lit-html](#using_lit_html)

```js
const App = (state, actions) => {
  // render view according to state, call actions to trigger changes
  // pass (state, actions) to other view functions.
};

const element = document.getElementById("app");
states.map(state => render(App(state, actions), element));
```

<a name="components"></a>
### [Components](#components)

To use multiple instances of a component, or to specify the state property outside of a component,
pass an `id` along with `state` and `actions` to views. Use `state[id]` to read the component's
state, pass the `id` to `actions`, and use the `id` in actions to issue patches that update the
corresponding state property.

See the [Components](https://meiosis.js.org/tutorial/06-components.html) section of the Meiosis
Tutorial for a complete explanation.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](https://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
