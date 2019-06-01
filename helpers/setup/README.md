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

- `patchinko.setup`
- `mergerino.setup`
- `functionPatches.setup`
- `immer.setup`
- `common.setup`
- `preact.setup`
- `react.setup`
- `simpleStream.stream`
- `simpleStream.scan`

## Setup

The `setup` function sets up the Meiosis pattern using the stream library and application that
you provide. In the application, you can define the `Initial` function, the `Actions`, the array
of acceptors, and the array of services, _all of which are optional_.

Because the `Initial` function may return a `Promise`, the `setup` function also returns a
`Promise` which provides the `update`, `models`, and `states` streams, as well as the created
`actions`.

For the stream library, you can use `Meiosis.simpleStream`,
[Flyd](https://github.com/paldepind/flyd), or [Mithril-Stream](https://mithril.js.org/stream.html)
out-of-the-box. You can also use another stream library; see
[Using another stream library](#other_stream_library), below.

### Patchinko Setup

To use [Patchinko](https://github.com/barneycarroll/patchinko):

```javascript
import meiosisPatchinko from "meiosis-setup/patchinko";
import simpleStream from "meiosis-setup/simpleStream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

import O from "patchinko/constant";
// or
// import O from "patchinko/immutable";
// or
// import P from "patchinko/explicit";

const app = {};

meiosisPatchinko({ stream: simpleStream, O, app })
  .then(({ update, models, states, actions }) => {
    // setup your view here
  })
```

### Mergerino Setup

To use [Mergerino](https://github.com/fuzetsu/mergerino):

```javascript
import meiosisMergerino from "meiosis-setup/mergerino";
import simpleStream from "meiosis-setup/simpleStream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

import merge from "mergerino";

const app = {};

meiosisMergerino({ stream: simpleStream, merge, app })
  .then(({ update, models, states, actions }) => {
    // setup your view here
  })
```

### Function Patch Setup

To use
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html):

```javascript
import meiosisFunctionPatches from "meiosis-setup/functionPatches";
import simpleStream from "meiosis-setup/simpleStream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

const app = {};

meiosisFunctionPatches({ stream: simpleStream, app })
  .then(({ update, models, states, actions }) => {
    // setup your view here
  })
```

### Immer Setup

To use [Immer](https://github.com/immerjs/immer):

```javascript
import meiosisImmer from "meiosis-setup/immer";
import simpleStream from "meiosis-setup/simpleStream";
// or
// import Stream from "mithril/stream";
// or
// import flyd from "flyd";

import produce from "immer";

const app = {};

meiosisImmer({ stream: simpleStream, produce, app })
  .then(({ update, models, states, actions }) => {
    // setup your view here
  })
```

### Application

In the `app` object that you provide to `setup`, you can optionally provide the following:

- `Initial`: a function that returns the initial state. This function can return immediately
or return a `Promise`. If not provided, the initial state is `{}`.
- `Actions`: a function that receives `(update)` and returns an object with actions.
The created actions are returned by `setup`, and also passed to `services`.
If not provided, the created actions are `{}`.
For convience, actions can pass arrays of patches to `update` to combine multiple patches into one,
thus reducing the number of updates, state changes, and view refreshes.
- `acceptors`: an array of "accept" functions that get called with `(state)`.
These functions are called in order and should return a patch to modify the state as needed.
You can also return an array of patches, which will automatically be `combine`d into a single
patch.
- `services`: an array of functions that get called with `({ state, update, actions })`. Services
can issue updates by calling `update` or by calling actions. Services can call `update`
synchronously or asynchrously. Multiple synchronous calls to `update` are automatically combined
into a single update.

### Common Setup

For a setup other than the supported libraries, you can use `meiosis-setup/common`. All you need to
do is specify the `accumulator` function and, optionally, the `combine` function:

- `accumulator`: `f(state, patch) => updatedState`. This function gets the latest state and the
patch (the patch being in whatever form you decide to use), and returns the updated state.

    For example, with Patchinko, the `accumulator` is `O`.

    With Mergerino, the `accumulator` is `merge`.

    With Function Patches, the `accumulator` is `(state, patch) => patch(state)`.

    With Immer, the `accumulator` is `produce`.

- `combine`: the `combine` function is of the form `([patches]) => patch`, combining an array of
patches into a single patch.

    For example, with Patchinko,
    `combine: patches => model => O(model, ...patches)`

    With Mergerino:
    `combine: patches => patches``

    With Function Patches, `combine` is function composition:
    `combine = fns => args => fns.reduceRight((arg, fn) => fn(arg), args)`

    With Immer,
    `combine: patches => model => { patches.forEach(patch => patch(model)); }`

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

