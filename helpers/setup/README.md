# meiosis-setup

```javascript
import meiosis from "meiosis-setup/functionPatches";
import simpleStream from "meiosis-setup/simple-stream";

const app = {
  initial: ...,
  Actions: update => ...,
  services: [...],
  Effects: (update, actions) => [...]
};

const { update, states, actions } = meiosis({ stream: simpleStream, app });
```

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to popular
demand and for your convenience, here are some utility functions that help set up and use Meiosis.

`meiosis-setup` wires up the Meiosis pattern for you as explained in
[Services and Effects](https://meiosis.js.org/docs/services-and-effects.html), plus these
conveniences:

- works with [Flyd](https://github.com/paldepind/flyd),
[Mithril-Stream](https://mithril.js.org/stream.html),
[Mergerino](https://github.com/fuzetsu/mergerino),
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html), and
[Immer](https://github.com/immerjs/immer) out of the box
- provides the ability to call `update()` with an array of patches, automatically combining them into
  a single patch
- provides a simple stream implementation
- provides convenience functions to wire up [React](https://reactjs.org) and
[Preact](https://preactjs.com)

Meiosis works with other view libraries of course. This document also shows how to wire up
[Mithril](https://mithril.js.org) and [lit-html](https://lit-html.polymer-project.org/).

See the [Meiosis examples](https://meiosis.js.org/examples.html) for some examples using
`meiosis-setup`.

## Getting Started

To use `meiosis-setup`, you specify a stream library, and, optionally, a library instance to manage
how patches are merged to the application state. Of course, you'll also need a view library.

### Choosing a stream library

Out of the box, `meiosis-setup` supports these stream libraries:

- the `simpleStream` provided by `meiosis-setup`
- [Flyd](https://github.com/paldepind/flyd)
- [Mithril-Stream](https://mithril.js.org/stream.html)

You can also use another stream library; see [Using another stream library](#other_stream_library).

### Choosing how to merge patches

Remember that the core of the Meiosis pattern is a stream of `states` that `scan`s an `update`
stream of patches and merges them to produce the states.

With `meiosis-setup`, you can use:

- [Mergerino](https://github.com/fuzetsu/mergerino)
- [Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html)
- [Immer](https://github.com/immerjs/immer)

You can also use another strategy of your choice to merge patches. See [Common Setup](#common_setup)
for details.

### Choosing a view library

You can use any view library that fits with the Meiosis pattern. `meiosis-setup` provides helper
functions to use [React](https://reactjs.org) and [Preact](https://preactjs.com). You can also use
[Mithril](https://mithril.js.org) and [lit-html](https://lit-html.polymer-project.org/) without any
special setup. See [View Setup](#view_setup) for details.

## Installation

Using `npm`:

```
npm i meiosis-setup
```

Using a `script` tag:

```
<script src="https://unpkg.com/meiosis-setup"></script>
```

Using the `script` tag exposes a `Meiosis` global, under which the helper functions are
provided:

- `mergerino.setup`
- `functionPatches.setup`
- `immer.setup`
- `common.setup`
- `preact.setup`
- `react.setup`
- `simpleStream.stream`
- `simpleStream.scan`

## Meiosis Setup

The `setup` function sets up the Meiosis pattern using the stream library and application that you
provide. In the application, you can define the `initial` state, the `Actions` constructor function,
the array of `services`, and the `Effects` constructor function, _all of which are optional_.

The `setup` function returns the `update` and `states` streams, as well as the created `actions`.

### Application

In the `app` object that you pass to `setup`, you can **optionally** provide the following:

- `initial`: an object that represents the initial state. If not provided, the initial state is
`{}`.
- `Actions`: a function that receives `(update, getState)` and returns an object with actions. The
  created actions are returned by `setup`, and also passed to `Effects`. If not provided, the
  created actions are `{}`. For convience, actions can pass arrays of patches to `update` to combine
  multiple patches into one, thus reducing the number of updates, state changes, and view refreshes.
  If an action is defined with `function() { ... }` rather than `() => { ... }`, it can call another
  action using `this.otherAction(...)`.
- `services`: an array of functions that get called with `state`. Service functions can change the
state by returning a patch:
    - returning any patch, changes the state
    - not returning anything, or returning a falsy value, does not change the state
- `Effects`: constructor function for effects, which gets called with `(update, actions)` and should
  return an array of functions that will get called with `state`. The return value of effect
  functions is ignored. Instead, effect functions should call `update` and/or `actions` to trigger
  further updates.

-----

**For an explanation of services and effects, please see the
[Services and Effects documentation](https://meiosis.js.org/docs/services-and-effects.html).**

-----

### Mergerino Setup

To use [Mergerino](https://github.com/fuzetsu/mergerino):

```javascript
import meiosis from "meiosis-setup/mergerino";
import simpleStream from "meiosis-setup/simple-stream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

import merge from "mergerino";

// A) if the initial state is synchronous:
const app = { initial: ..., ... };

const { update, states, actions } =
  meiosis({ stream: simpleStream, merge, app });

// setup your view here
// call update({ duck: "quack" }) to update the state
// and/or call actions.someAction(someValue)

// OR

// B) if the initial state is asynchronous:
asyncFunction(...).then(response => {
  const initial = buildInitialState(response);
  const app = { initial, ... };
  meiosis({ stream: simpleStream, merge, app });

  // setup your view here
  // call update({ duck: "quack" }) to update the state
  // and/or call actions.someAction(someValue)
});
```

### Function Patch Setup

To use
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html):

```javascript
import meiosis from "meiosis-setup/functionPatches";
import simpleStream from "meiosis-setup/simple-stream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

// A) if the initial state is synchronous:
const app = { initial: ..., ... };

const { update, states, actions } =
  meiosis({ stream: simpleStream, app });

// setup your view here
// call update(state => ({ ...state, duck: "quack" })) to update the state
// and/or call actions.someAction(someValue)

// OR

// B) if the initial state is asynchronous:
asyncFunction(...).then(response => {
  const initial = buildInitialState(response);
  const app = { initial, ... };
  meiosis({ stream: simpleStream, app });

  // setup your view here
  // call update(state => ({ ...state, duck: "quack" })) to update the state
  // and/or call actions.someAction(someValue)
});
```

### Immer Setup

To use [Immer](https://github.com/immerjs/immer):

```javascript
import meiosis from "meiosis-setup/immer";
import simpleStream from "meiosis-setup/simple-stream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

import produce from "immer";

// A) if the initial state is synchronous:
const app = { initial: ..., ... };

const { update, states, actions } =
  meiosis({ stream: simpleStream, produce, app });

// setup your view here
// call update(draft => { draft.duck = "quack"; }) to update the state
// and/or call actions.someAction(someValue)

// OR

// B) if the initial state is asynchronous:
asyncFunction(...).then(response => {
  const initial = buildInitialState(response);
  const app = { initial, ... };
  meiosis({ stream: simpleStream, produce, app });

  // setup your view here
  // call update(draft => { draft.duck = "quack"; }) to update the state
  // and/or call actions.someAction(someValue)
});
```

<a name="view_setup"></a>
## View Setup

### Mithril Setup

To use `meiosis-setup` with [Mithril](https://mithril.js.org), no special setup is necessary:

```javascript
import meiosis from "meiosis-setup/...";
import m from "mithril";

const App = {
  // If you only use update or actions, you can omit the other
  view: ({ attrs: { state, update, actions } }) => m(...)
};

// If you only use update or actions, you can omit the other
const { states, update, actions } = meiosis({ ... });

m.mount(document.getElementById("app"), {
  // If you only use update or actions, you can omit the other
  view: () => m(App, { state: states(), update, actions })
});
```

See [here](https://github.com/foxdonut/meiosis/blob/master/helpers/setup/views/mithril/src/index.js)
for an example.

### React Setup

To create the top-level `App` component with [React](https://reactjs.org), use:

```javascript
import meiosis from "meiosis-setup/...";
import reactSetup from "meiosis-setup/react";
import React from "react";
import ReactDOM from "react-dom";

// your root component
const Root = ({ state, update, actions }) => (
  <div>...</div>
);

const App = reactSetup({ React, Root });

// Actions are optional
const app = { initial, Actions, ... };
// If you only use update or actions, you can omit the other
const { state, update, actions } = meiosis({ stream, app, ... });

const element = document.getElementById("app");
// If you only use update or actions, you can omit the other
ReactDOM.render(<App states={states} update={update} actions={actions} />, element);
```

See [here](https://github.com/foxdonut/meiosis/blob/master/helpers/setup/views/react/src/index.jsx)
for an example.

### Preact Setup

To create the top-level `App` component with [Preact](https://preactjs.com), use:

```javascript
import meiosis from "meiosis-setup/...";
import preactSetup from "meiosis-setup/preact";
import { h, render } from "preact";
import { useState } from "preact/hooks";

// your root component
const Root = ({ state, update, actions }) => (
  <div>...</div>
);

const App = preactSetup({ h, useState, Root });

// Actions are optional
const app = { initial, Actions, ... };
// If you only use update or actions, you can omit the other
const { state, update, actions } = meiosis({ stream, app, ... });

const element = document.getElementById("app");
// If you only use update or actions, you can omit the other
render(<App states={states} update={update} actions={actions} />, element);
```

See [here](https://github.com/foxdonut/meiosis/blob/master/helpers/setup/views/preact/src/index.js)
for an example.

### lit-html Setup

To use `meiosis-setup` with [lit-html](https://lit-html.polymer-project.org/), no special setup is
necessary:

```javascript
import meiosis from "meiosis-setup/...";
import { html, render } from "lit-html";

const App = ({ state, update, actions }) => html`
  <div>... </div>
`;

// Actions are optional
const app = { initial, Actions, ... };
// If you only use update or actions, you can omit the other
const { state, update, actions } = meiosis({ stream, app, ... });

const element = document.getElementById("app");
// If you only use update or actions, you can omit the other
states.map(state => render(App({ state, update, actions }), element));
```

See
[here](https://github.com/foxdonut/meiosis/blob/master/helpers/setup/views/lit-html/src/index.js)
for an example.

<a name="common_setup"></a>
## Common Setup

For a setup other than the supported libraries, you can use `meiosis-setup/common`. All you need to
do is specify the `accumulator` function and the `combine` function:

- `accumulator`: `f(state, patch) => updatedState`. This function gets the latest state and the
patch (the patch being in whatever form you decide to use), and returns the updated state.

    With Mergerino, the `accumulator` is `merge`.

    With Function Patches, the `accumulator` is `(state, patch) => patch(state)`.

    With Immer, the `accumulator` is `produce`.

- `combine`: the `combine` function is of the form `([patches]) => patch`, combining an array of
patches into a single patch.

    With Mergerino:
    `combine = patches => patches`

    With Function Patches:
    `combine = fns => args => fns.reduce((arg, fn) => fn(arg), args)`

    With Immer,
    `combine = patches => state => patches.reduce((result, patch) => produce(result, patch), state)`.
    We can't use `patches.reduce(produce, state)` because that would send a third argument to
    `produce` and not work correctly.

<a name="other_stream_library"></a>
### Using another stream library

You can use another stream library, as long as you provide either a function that creates a stream,
or an object with a `stream` property for that function. In either case, there must also be a `scan`
property on the function or object. Finally, the created stream must be a function that, when
called, emits a value onto the stream; and the function must have a `map` method.

## API

[API documentation is here.](api.md)

## Credits

Many thanks to [Barney Carroll](https://github.com/barneycarroll),
[James Forbes](https://twitter.com/james_a_forbes),
[Daniel Loomer](https://github.com/fuzetsu),
[Scotty Simpson](https://github.com/CreaturesInUnitards), and
[Stephan Thon](https://github.com/smuemd)
for your contributions, feedback, and suggestions. They are much appreciated!

----

_meiosis-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
