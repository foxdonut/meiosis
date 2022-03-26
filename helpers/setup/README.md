# meiosis-setup

```javascript
// Choose to use function patches or mergerino
import meiosisSetup from "meiosis-setup/functionPatches";
import meiosisSetup from "meiosis-setup/mergerino";

const app = {
  initial: { ... },
  services: [...]
};

const cells = meiosisSetup({ app });
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

The `meiosisSetup` function sets up the Meiosis pattern using the stream library and application
that you provide.

The `setup` function returns a stream of _cells_.

### Application

In the `app` object that you pass to `setup`, you can **optionally** provide the following:

- `initial`: an object that represents the initial state. If not provided, the initial state is
`{}`.
- `services`: an array of services.

-----

**For an explanation of services, please see the
[Services documentation](https://meiosis.js.org/docs/services-and-effects.html).**

-----

<a name="view_setup"></a>
## View Setup

### Mithril Setup

[Mithril](https://mithril.js.org) setup:

```javascript
import meiosisSetup from "meiosis-setup/...";
import m from "mithril";

// your App component
const App = {
  view: ({ attrs: { cell } }) => m(...)
};

// your app
const app = { ... };
const cells = meiosisSetup({ app });

m.mount(document.getElementById("app"), {
  view: () => m(App, { cell: cells() })
});

states.map(() => m.redraw());
```

See [here](https://github.com/foxdonut/meiosis/blob/master/helpers/setup/views/mithril/src/index.js)
for an example.

### Preact Setup

[Preact](https://preactjs.com) setup:

```javascript
import meiosisSetup from "meiosis-setup/...";
import { h, render } from "preact"

// your App component
const App = ({ cell }) => (
  <div>...</div>
);

// your app
const app = { ... };
const cells = meiosisSetup({ app });

const element = document.getElementById("app")
cells.map(cell => render(<App cell={cell} />, element))
```

See [here](https://github.com/foxdonut/meiosis/blob/master/helpers/setup/views/preact/src/index.js)
for an example.

### React Setup

[React](https://reactjs.org) setup:

```javascript
import meiosisSetup from "meiosis-setup/...";
import React from "react"
import { render } from "react-dom"

// your App component
const App = ({ cell }) => (
  <div>...</div>
);

// your app
const app = { ... };
const cells = meiosisSetup({ app });

const element = document.getElementById("app")
cells.map(cell => render(<App cell={cell} />, element))
```

See [here](https://github.com/foxdonut/meiosis/blob/master/helpers/setup/views/react/src/index.jsx)
for an example.

## Nesting

More to come..

See the repository for examples:
- [Using JavaScript](https://github.com/foxdonut/meiosis/tree/master/helpers/setup/using-javascript)
- [Using Typescript](https://github.com/foxdonut/meiosis/tree/master/helpers/setup/using-typescript)

## API

[API documentation is here.](docs/index.html)

## Credits

Many thanks to the following people for your contributions, feedback, and suggestions. They are much
appreciated!

- [James Forbes](https://james-forbes.com)
- [Scotty Simpson](https://github.com/CreaturesInUnitards)
- [Daniel Loomer](https://github.com/fuzetsu)
- [Erik Vullings](https://github.com/erikvullings)
- [Barney Carroll](https://github.com/barneycarroll)
- [Stephan Thon](https://github.com/smuemd)
- [Constantin Angheloiu](https://github.com/cmnstmntmn)

----

_meiosis-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
