# meiosis-setup

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to
popular demand and for your convenience, here are some reusable snippets of code that help
setup and use Meiosis.

## Migrating from version 3 to version 4

Version 4 of `meiosis-setup` works a little differently than version 3. Here are the changes and
steps to migration:

### Services

In version 3, services returned:

```javascript
({ state?, patch?, render?, next? })
```

Respectively indicating:
- a patch to change the state
- a different patch
- aborting the render
- the next update to run.

In version 4, services return:

```javascript
patch?
```

Only a patch to change the state. Thus, services from version 3 should be changed to directly return
what they were returning under `{ state }`:

```javascript
// version 3
return { state: <patch>, ... };

// version 4
return <patch>;
```

See below for migrating `{ patch, render, next }`.

### Aborting a Patch

In version 3, a service could return `{ patch: false }` to abort a patch, or `{ patch: newPatch }` to
abort the current sequence and issue a different patch.

In version 4, the incoming patch should not be changed. Instead, a service can return a patch that
reverts to the previous state to abort a patch. The current sequence cannot be aborted, but an
effect (see below) can be used to issue another patch.

### Preventing a Re-Render

In version 3, a service could return `{ render: false }` to prevent a re-render.

In version 4, a service can achieve the same result by returning a patch that reverts to the
previous state. Indeed, when the final state after services have applied their patches is the same
as the previous state, the view is not re-rendered.

### Effects

In version 3, services could return `{ next: fn }` to indicate a function that can trigger updates
after the current sequence.

In version 4, these are moved to separate `effects`. The function signature is the same, except
that the function also receives `previousState`, becoming:

```javascript
({ state, previousState, patch, update, actions }) => {
  // ...
}
```

To use effects, specify an array of effect functions in the `effects` property of the `app` object:

```javascript
// version 3
const app = {
  services: [
    (/* ... */) => {
      // ...
      return {
        next: fn1
      };
    },
    (/* ... */) => {
      // ...
      return {
        next: fn2
      };
    }
  ]
}

// version 4
const app = {
  services: [/* ... */],
  effects: [fn1, fn2]
}
```

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

## Setup

The `setup` function sets up the Meiosis pattern using the stream library and application that you
provide. In the application, you can define the `initial` state, the `Actions`, the array of
services, and the array of effects, _all of which are optional_.

The `setup` function returns the `update` and `states` streams, as well as the created `actions`.

For the stream library, you can use `Meiosis.simpleStream`,
[Flyd](https://github.com/paldepind/flyd), or [Mithril-Stream](https://mithril.js.org/stream.html)
out-of-the-box. You can also use another stream library; see
[Using another stream library](#other_stream_library), below.

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

const app = {};

const { update, states, actions } =
  meiosis({ stream: simpleStream, merge, app });

// setup your view here
// call update({ duck: "quack" }) to update the state

// If the initial state is asynchronous:

asyncFunction(...).then(response => {
  const initial = buildInitialState(response);
  const app = { initial, ... };
  meiosis({ stream: simpleStream, merge, app });

  // setup your view here
  // call update({ duck: "quack" }) to update the state
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

const app = {};

const { update, states, actions } =
  meiosis({ stream: simpleStream, app });

// setup your view here
// call update(state => ({ ...state, duck: "quack" })) to update the state

// If the initial state is asynchronous:

asyncFunction(...).then(response => {
  const initial = buildInitialState(response);
  const app = { initial, ... };
  meiosis({ stream: simpleStream, app });

  // setup your view here
  // call update(state => ({ ...state, duck: "quack" })) to update the state
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

const app = {};

const { update, states, actions } =
  meiosis({ stream: simpleStream, produce, app });

// setup your view here
// call update(draft => { draft.duck = "quack"; }) to update the state

// If the initial state is asynchronous:

asyncFunction(...).then(response => {
  const initial = buildInitialState(response);
  const app = { initial, ... };
  meiosis({ stream: simpleStream, produce, app });

  // setup your view here
  // call update(draft => { draft.duck = "quack"; }) to update the state
});
```

### Application

In the `app` object that you provide to `setup`, you can optionally provide the following:

- `initial`: an object that represents the initial state. If not provided, the initial state is
`{}`.
- `Actions`: a function that receives `(update)` and returns an object with actions. The created
actions are returned by `setup`, and also passed to `services`. If not provided, the created
actions are `{}`. For convience, actions can pass arrays of patches to `update` to combine
multiple patches into one, thus reducing the number of updates, state changes, and view refreshes.
If an action is defined with `function() { ... }` rather than `() => { ... }`, it can call another
action using `this.otherAction(...)`.
- `services`: an array of functions that get called with `({ state, previousState, patch })`.
Service functions can change the state by returning a patch:
    - returning any patch, changes the state
    - not returning anything, or returning a falsy value, does not change the state
    - reverting to the previous state using a compatible patch that produces `previousState`. Using
    `() => previousState` works for Mergerino, Function Patches, and Immer. If you revert to the
    previous state, the `states` stream does not receive a value and the view is not re-rendered.
- `effects`: an array of functions that get called with
`({ state, previousState, patch, update, actions })`. The return value of effect functions is
ignored. Instead, effect functions should call `update` and/or `actions` to trigger further
updates.

### Common Setup

For a setup other than the supported libraries, you can use `meiosis-setup/common`. All you need to
do is specify the `accumulator` function and, optionally, the `combine` function:

- `accumulator`: `f(state, patch) => updatedState`. This function gets the latest state and the
patch (the patch being in whatever form you decide to use), and returns the updated state.

    With Mergerino, the `accumulator` is `merge`.

    With Function Patches, the `accumulator` is `(state, patch) => patch(state)`.

    With Immer, the `accumulator` is `produce`.

- `combine`: the `combine` function is of the form `([patches]) => patch`, combining an array of
patches into a single patch.

    With Mergerino:
    `combine: patches => patches``

    With Function Patches, `combine` is the `pipe` function:
    `combine = fns => args => fns.reduce((arg, fn) => fn(arg), args)`

    With Immer,
    `combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state)`
    (we can't use `patches.reduce(produce, state)` because that would send a third argument to
    `produce`.

<a name="other_stream_library"></a>
### Using another stream library

You can use another stream library, as long as you provide either a function that creates a stream,
or an object with a `stream` property for that function. In either case, there must also be a `scan`
property on the function or object. Finally, the created stream must be a function that, when
called, emits a value onto the stream; and the function must have a `map` method.

## View Setup

### Mithril Setup

To use `meiosis-setup` with [Mithril](https://mithril.js.org), no special setup is necessary:

```javascript
import meiosis from "meiosis-setup/...";
import m from "mithril";

const App = {
  view: ({ attrs: { state, update, actions } }) => m(...)
};

const { states, update, actions } = meiosis({ ... });

m.mount(document.getElementById("app"), {
  view: () => m(App, { state: states(), update, actions })
});
```

### React Setup

To create the top-level `App` component with [React](https://reactjs.org), use:

```javascript
import meiosis from "meiosis-setup/...";
import React from "react";
import reactSetup from "meiosis-setup/react";

const Root = /* your root component */

const App = reactSetup({ React, Root });
```

### Preact Setup

To create the top-level `App` component with [Preact](https://preactjs.com), use:

```javascript
import meiosis from "meiosis-setup/...";
import { h, Component, render } from "preact";
import preactSetup from "meiosis-setup/preact";

// your root component
const Root = ({ state, update, actions }) => (
  <div>...</div>
);

const App = preactSetup({ h, Component, Root });

// Actions are optional
const app = { initial, Actions, ... };
// If you only use update or actions, you can omit the other
const { state, update, actions } = meiosis({ stream, app, ... });

const element = document.getElementById("app");
// If you only use update or actions, you can omit the other
render(<App states={states} update={update} actions={actions} />, element);
```

### API

[API documentation is here.](api.md)

## Credits

Many thanks to [Stephan Thon](https://github.com/smuemd),
[Daniel Loomer](https://github.com/fuzetsu), [Barney Carroll](https://github.com/barneycarroll),
[Scotty Simpson](https://github.com/CreaturesInUnitards), and
[James Forbes](https://twitter.com/james_a_forbes)
for your contributions, feedback, and suggestions. They are much appreciated!

----

_meiosis-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
