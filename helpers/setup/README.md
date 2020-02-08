# meiosis-setup

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to
popular demand and for your convenience, here are some reusable snippets of code that help
setup and use Meiosis.

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
provide. In the application, you can define the `initial` state, the `Actions`, and the array of
services, _all of which are optional_.

The `setup` function returns the `update` and `states` streams, as well as the created `actions`.

For the stream library, you can use `Meiosis.simpleStream`,
[Flyd](https://github.com/paldepind/flyd), or [Mithril-Stream](https://mithril.js.org/stream.html)
out-of-the-box. You can also use another stream library; see
[Using another stream library](#other_stream_library), below.

### Mergerino Setup

To use [Mergerino](https://github.com/fuzetsu/mergerino):

```javascript
import meiosisMergerino from "meiosis-setup/mergerino";
import simpleStream from "meiosis-setup/simple-stream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

import merge from "mergerino";

const app = {};

const { update, states, actions } =
  meiosisMergerino({ stream: simpleStream, merge, app });

// setup your view here
```

### Function Patch Setup

To use
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html):

```javascript
import meiosisFunctionPatches from "meiosis-setup/functionPatches";
import simpleStream from "meiosis-setup/simple-stream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

const app = {};

const { update, states, actions } =
  meiosisFunctionPatches({ stream: simpleStream, app });

// setup your view here
```

### Immer Setup

To use [Immer](https://github.com/immerjs/immer):

```javascript
import meiosisImmer from "meiosis-setup/immer";
import simpleStream from "meiosis-setup/simple-stream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

import produce from "immer";

const app = {};

const { update, states, actions } =
  meiosisImmer({ stream: simpleStream, produce, app });

// setup your view here
```

### Application

In the `app` object that you provide to `setup`, you can optionally provide the following:

- `initial`: an object that represents the initial state. If not provided, the initial state is
`{}`.
- `patch`: a patch that will initially be sent onto the `update` stream. If not specified, the
initial patch will be `false`.
- `Actions`: a function that receives `(update)` and returns an object with actions.
The created actions are returned by `setup`, and also passed to `services`.
If not provided, the created actions are `{}`.
For convience, actions can pass arrays of patches to `update` to combine multiple patches into one,
thus reducing the number of updates, state changes, and view refreshes.
- `services`: an array of functions that get called with `({ state, previousState, patch })`.
Service functions can issue updates by returning an object with any combination of the following
properties:
    - `state`: a patch or array of patches to update the state, for example computed properties.
    - `patch: differentPatch`: this changes the patch to a different one, aborting the current loop
      and starting over with `differentPatch`.
    - `patch: false`: this cancels the patch altogether, aborting the current loop and cancelling
      the render.
    - `render: false`: this continues the loop but does not render the view. For example, when
      arriving at a route and needing to load asynchronous data (with `next`, below), but without a
      "loading..." state.
    - `next: ({ update, actions, state, patch }) => { ... }`: this schedules a function to be called
      at the end of the loop. The function can trigger more updates by calling `update` and/or
      `actions`. Updates can be synchronous and/or asynchronous.

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

### React Setup

To create the top-level `App` component with [React](https://reactjs.org), use:

```javascript
import React from "react";
import reactSetup from "meiosis-setup/react";

const Root = /* your root component */

const App = reactSetup({ React, Root });
```

### Preact Setup

To create the top-level `App` component with [Preact](https://preactjs.com), use:

```javascript
import preact from "preact";
import preactSetup from "meiosis-setup/preact";

const Root = /* your root component */

const App = preactSetup({ React, Root });
```

### API

[API documentation is here.](api.md)

## Credits

Many thanks to [Stephan Thon](https://github.com/smuemd),
[Daniel Loomer](https://github.com/fuzetsu), and [Barney Carroll](https://github.com/barneycarroll)
for your contributions, feedback, and suggestions. They are much appreciated!

----

_meiosis-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
