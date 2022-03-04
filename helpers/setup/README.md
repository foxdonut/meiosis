# meiosis-setup

```javascript
import meiosis from "meiosis-setup";

const app = {
  initial: { ... },
  services: [...],
  effects: [...]
};

const { states, getCell } = meiosis.functionPatches.setup({ app });

// or

const { states, getCell } = meiosis.mergerino.setup({ app });
```

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to popular
demand and for your convenience, here are some utility functions that help set up and use Meiosis.

`meiosis-setup` wires up the Meiosis pattern for you as explained in
[Services and Effects](https://meiosis.js.org/docs/services-and-effects.html), plus these
conveniences:

- works with [Flyd](https://github.com/paldepind/flyd),
[Mithril-Stream](https://mithril.js.org/stream.html),
[Mergerino](https://github.com/fuzetsu/mergerino), and
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html)
out of the box
- provides a simple stream implementation
- provides [TypeScript](https://www.typescriptlang.org) support
- provides a helper function to combine an array of patches into a single patch

See the repository for examples:
- [Using JavaScript](https://github.com/foxdonut/meiosis/tree/master/helpers/setup/using-javascript)
- [Using Typescript](https://github.com/foxdonut/meiosis/tree/master/helpers/setup/using-typescript)

Also see the [Meiosis examples](https://meiosis.js.org/examples.html) for more examples using
`meiosis-setup`.

## Getting Started

To use `meiosis-setup`, specify a stream library, and, optionally, a library instance to manage how
patches are merged to the application state. Of course, you'll also need a view library.

### Choosing a stream library

Out of the box, `meiosis-setup` supports these stream libraries:

- the `simpleStream` provided by `meiosis-setup` (used by default)
- [Flyd](https://github.com/paldepind/flyd)
- [Mithril-Stream](https://mithril.js.org/stream.html)

You can also use another stream library; see [Using another stream library](#other_stream_library).

### Choosing how to merge patches

Remember that the core of the Meiosis pattern is a stream of `states` that `scan`s an `update`
stream of patches and merges them to produce the states.

With `meiosis-setup`, you can use:

- [Mergerino](https://github.com/fuzetsu/mergerino)
- [Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html)

You can also use another strategy of your choice to merge patches. See [Common Setup](#common_setup)
for details.

### Choosing a view library

You can use any view library that fits with the Meiosis pattern. Examples show how to use with
[React](https://reactjs.org), [Preact](https://preactjs.com), and [Mithril](https://mithril.js.org).
See [View Setup](#view_setup) for details.

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
- `common.setup`
- `simpleStream.stream`
- `simpleStream.scan`

## Meiosis Setup

The `setup` function sets up the Meiosis pattern using the stream library and application that you
provide. In the application, you can define the `initial` state, the array of `services`, and the
array of `effects` _all of which are optional_.

The `setup` function returns the `update` and `states` streams, as well as the created `actions`.

### Application

In the `app` object that you pass to `setup`, you can **optionally** provide the following:

- `initial`: an object that represents the initial state. If not provided, the initial state is
`{}`.
- `services`: an array of functions that get called with `state`. Service functions can change the
state by returning a patch:
    - returning any patch, changes the state
    - not returning anything, does not change the state
- `effects`: an array of functions that will get called with `{ state, update }`. The return value
  of effect functions is ignored. Instead, effect functions should call `update` to trigger further
  updates.

-----

**For an explanation of services and effects, please see the
[Services and Effects documentation](https://meiosis.js.org/docs/services-and-effects.html).**

-----

### Mergerino Setup

To use [Mergerino](https://github.com/fuzetsu/mergerino):

```javascript
import { setup } from "meiosis-setup/mergerino";
// optional:
import Stream from "mithril/stream";
// or
import flyd from "flyd";

// A) if the initial state is synchronous:
const app = { initial: ..., ... };

const { states, getCell } = setup({ app });

// or
const { states, getCell } = setup({ stream: Stream, app });
// or
const { states, getCell } = setup({ stream: flyd, app });

// setup your view here

// OR

// B) if the initial state is asynchronous:
asyncFunction(...).then(response => {
  const initial = buildInitialState(response);
  const app = { initial, ... };
  meiosis({ app });

  // setup your view here
});
```

### Function Patch Setup

To use
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html):

same as above, except:

```javascript
import { setup } from "meiosis-setup/functionPatches";
```

<a name="view_setup"></a>
## View Setup

### Mithril Setup

To use `meiosis-setup` with [Mithril](https://mithril.js.org), no special setup is necessary:

```javascript
import { setup } from "meiosis-setup/...";
import m from "mithril";

const App = {
  view: ({ attrs: { cell } }) => m(...)
};

const { states, getCell } = setup({ ... });

m.mount(document.getElementById("app"), {
  view: () => m(App, { cell: getCell() })
});

states.map(() => m.redraw());
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

<a name="common_setup"></a>
## Common Setup

For a setup other than the supported libraries, you can use `meiosis-setup/common`. All you need to
do is specify the `accumulator` function and the `combine` function:

- `accumulator`: `f(state, patch) => updatedState`. This function gets the latest state and the
patch (the patch being in whatever form you decide to use), and returns the updated state.

    With Mergerino, the `accumulator` is `merge`.

    With Function Patches, the `accumulator` is `(state, patch) => patch(state)`.

- `combine`: the `combine` function is of the form `([patches]) => patch`, combining an array of
patches into a single patch.

    With Mergerino:
    `combine = patches => patches`

    With Function Patches:
    `combine = fns => args => fns.reduce((arg, fn) => fn(arg), args)`

<a name="other_stream_library"></a>
### Using another stream library

You can use another stream library, as long as you provide either a function that creates a stream,
or an object with a `stream` property for that function. In either case, there must also be a `scan`
property on the function or object. Finally, the created stream must be a function that, when
called, emits a value onto the stream; and the function must have a `map` method.

## Nesting

As explained in the [Components](http://meiosis.js.org/tutorial/06-components.html) section of the
Meiosis Tutorial, we can use IDs for using multiple instances of a component. Optionally, we can
also use _nesting_.

With nesting, we call a helper function `nest` with a path to where the component state is stored
within the top-level application state. The `nest` function returns a `local` object that contains
these functions:
- `get(<state>)`: returns the component's local state from the top-level `state`
- `patch(<patch>)`: creates a top-level patch from the component's local patch

By passing `local` to a component, the component can use `get` and `patch` to respectively get and
update its local state without needing to know where its state is stored within the top-level
application state.

To use nesting, start by obtaining the `nest` function according to the type of patch:

```javascript
const nest = meiosis.functionPatches.nest;
const nest = meiosis.mergerino.nest;
```

Then call `nest`, passing the path, either a string for a single level, or an array of strings for
nesting down multiple levels:

```javascript
const local = nest("conditions");
const local = nest(["temperature", "air"]);
```

Finally, pass `local` to the component, and use `local.get` and `local.patch` to get and update the
local state:

```javascript
const temperature = local.get(state).value;
update( local.patch({ value: x => x + amount }) );
```

See the repository for examples:
- [Using JavaScript](https://github.com/foxdonut/meiosis/tree/master/helpers/setup/using-javascript)
- [Using Typescript](https://github.com/foxdonut/meiosis/tree/master/helpers/setup/using-typescript)

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
