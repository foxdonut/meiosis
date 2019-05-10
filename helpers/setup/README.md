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
- `functionPatches.setup`
- `common.setup`
- `simpleStream.stream`
- `simpleStream.scan`

## Setup

The `setup` function sets up the Meiosis pattern using the stream library, accumulator function,
acceptor function (optional), and application that you provide. The application in turn defines
the initial state function, the actions, the array of acceptors, and the array of services, all
of which are optional.

Because the initial state function may return a `Promise`, the `setup` function also returns a
`Promise` which provides the `update`, `models`, and `states` streams, as well as the created
`actions`.

For the stream library, both [Flyd](https://github.com/paldepind/flyd) and
[Mithril-Stream](https://mithril.js.org/stream.html) work out-of-the-box. You can use another
stream library; see [Using another stream library](#other_stream_library), below.

### Patchinko Setup

If you are using [Patchinko](https://github.com/barneycarroll/patchinko), use `patchinko.setup`:

```javascript
import meiosis from "meiosis-setup";

import O from "patchinko/constant";
// or
// import O from "patchinko/immutable";
// or
// import P from "patchinko/explicit";

import Stream from "mithril/stream";
// or
// import flyd from "flyd";

const app = {};

meiosis.patchinko.setup({ stream: Stream, O, app })
  .then(({ update, models, states, actions }) => {
    // setup your view here
  })
```

### Function Patch Setup

If you are using
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html), use
`functionPatches.setup`:

```javascript
import meiosis from "meiosis-setup";

import Stream from "mithril/stream";
// or
// import flyd from "flyd";

const app = {};

meiosis.functionPatches.setup({ stream: Stream, app })
  .then(({ update, models, states, actions }) => {
    // setup your view here
  })
```

### Common Setup

You can use a setup other than Patchinko or Function Patches with `common.setup`. All you need to
do is specify the `accumulator` function and, optionally, the `acceptor` function:

- `accumulator`: `f(state, patch) => updatedState`. This function gets the latest state and the
patch (the patch being in whatever form you decide to use), and returns the updated state.

    For example, with Patchinko, the `accumulator` is `O`.

    With Function Patches, the `accumulator` is `(state, patch) => patch(state)`.

- `acceptor` (optional): `f(state, fn) => updatedState`. This function gets the latest state and
a function. Calling that function with `state` produces a patch, which should then be applied to
the state to return the updated state.

    For example, with Patchinko, the `acceptor` is `(state, fn) => O(state, fn(state))`.

    With Function Patches, the `acceptor` is `(state, fn) => fn(state)(state)`.

    **Note** that you **only** have to specify an acceptor function if you have `acceptors`
    in your `app`.

Here is how you would use `common.setup` with [Immer](https://github.com/immerjs/immer):

```javascript
import meiosis from "meiosis-setup";

import produce from "immer";

import Stream from "mithril/stream";
// or
// import flyd from "flyd";

const acceptor = (state, patch) => produce(state, fn(state));

const app = {};

meiosis.common.setup({ stream: Stream, accumulator: produce, acceptor, app })
  .then(({ update, models, states, actions }) => {
    // setup your view here
  })
```

### App Initial State, Actions, Acceptors, and Services

As you saw in the examples above, everything you specify in your `app` is optional.
You can specify:

- `initial`: a **function** that returns the initial state. This can return immediately
or return a `Promise`. If not specified, the initial state is `{}`.
- `Actions`: a function that receives `update` and returns the actions. If not
specified, the created actions are `{}`.
- `acceptors`: an array of functions, each of which is `f(state) => patch`. These
functions get called in sequence. The patches that they return are applied to the
state to produce the updated state. If not specified, `acceptors` is `[]`.
- `services`: an array of functions, each of which is
`f({ state, update, actions }) => <void>`. These functions get called with the
latest state, the `update` stream, and the `actions`. Service functions trigger
updates by calling `update` and/or `actions.f(...)`, either synchronously
and/or asynchronously. If not specified, `services` is `[]`.

### Examples

Coming soon.

<a name="other_stream_library"></a>
### Using another stream library

You can use another stream library, as long as you provide either a function that creates a stream,
or an object with a `stream` property for that function. In either case, there must also be a `scan`
property on the function or object. Finally, the created stream must be a function that, when
called, emits a value onto the stream; and the function must have a `map` method.

### API

[API documentation](api.md)

----

_meiosis-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._

