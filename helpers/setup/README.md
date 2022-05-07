# meiosis-setup

# Caution: Work In Progress - Not Yet Released!

Helper library to set up the [Meiosis](https://meiosis.js.org) pattern for you. Please refer to the
[documentation](https://meiosis.js.org/docs/toc.html) on the Meiosis pattern.

## Features

- Works with [function patches](#setup-with-function-patches) and [Mergerino](#setup-with-mergerino)
- Includes a simple stream implementation, or you can use [Flyd](https://github.com/paldepind/flyd)
or [Mithril Stream](https://mithril.js.org/stream.html)
- Sets up [Services](#services), [Nesting](#nesting), and [Nested Components](#nested-components)
- Provides [TypeScript](https://www.typescriptlang.org/) support

## Setup with Function Patches

To set up Meiosis with function patches (explained in the Meiosis Documentation:
[reference](http://meiosis.js.org/docs/04-meiosis-with-function-patches.html)), use the following
code:

```js
import meiosisSetup from 'meiosis-setup/functionPatches';

const cells = meiosisSetup();
```

## Setup with Mergerino

To set up Meiosis with [Mergerino](https://github.com/fuzetsu/mergerino)
(explained in the Meiosis Documentation:
[reference](http://meiosis.js.org/docs/05-meiosis-with-mergerino.html)), use the following
code:

```js
import meiosisSetup from 'meiosis-setup/mergerino';

const cells = meiosisSetup();
```

## Using Cells

Once Meiosis is set up either with Function Patches or Mergerino, you have a stream of **cells**.
Each cell has `state` and `update` to read the state and update the state. Normally you use
`cells.map` to render the view on each state change. For example, with Preact or React:

```js
import meiosisSetup from '...';
import { render } from '...'; // Preact or React

const cells = meiosisSetup();

const view = (cell) => (
  <div>
    <span>Counter: {cell.state.counter}</span>
    <button onClick={() => cell.update(...)}>Increment</button>
  </div>
);

const element = document.getElementById('...');
cells.map((cell) => {
  render(view(cell), element);
});
```

With Mithril:

```jsx
import meiosisSetup from '...';
import m from 'mithril';

const cells = meiosisSetup();

const view = (cell) =>
  m('div',
    m('span', 'Counter:', cell.state.counter),
    m('button', { onclick: () => cell.update(...) }, 'Increment')
  );

m.mount(document.getElementById('jsMithrilApp'), {
  view: () => app.view(cells())
});

cells.map(() => m.redraw());
```

## Initial State

By default, the initial state is an empty object, `{}`.

## Services

To set up Meiosis with Services
(explained in the Meiosis Documentation:
[reference](http://meiosis.js.org/docs/08-services.html)), use the following
code:

```js
const app = {
  services: [...]
};

const cells = meiosisSetup({ app });
```

Each service is an object with a `run` function and, optionally, an `onchange` function.
`meiosis-setup` automatically wires up services, calling `onchange` (if defined) and calling `run`
only when the value returned by `onchange` changes:

```js
const service = {
  onchange: (state) => state.x,
  // run is called only when x changes, thus avoiding infinite loops
  run: (cell) => {
    cell.update({ y: x * 10 });
  }
};
```

If a service does not have an `onchange` function, its `run` function will be called for every state
change. Thus it must make sure to avoid an infinite loop:

```js
const service = {
  run: (cell) => {
    if (cell.state.data === undefined) {
      loadData().then(data => {
        cell.update({ data });
      })
    }
  }
}
```

Services can also be nested using [nested components](#nested-components).

## Nesting

`meiosis-setup` automatically sets up Meiosis with Nesting
(explained in the Meiosis Documentation:
[reference](http://meiosis.js.org/docs/09-nesting.html)).

```js
cell.nest('someProperty')
```

## Nested Components

`meiosis-setup` also provides **nested components**. This conveniently combines nesting of:
- initial state
- services
- views

## TypeScript Support

## TypeScript API

[TypeScript API documentation is here.](docs/index.html)

## Using a Different Stream Implementation

By default, `meiosis-setup` uses its `simple-stream` implementation. You can use a different stream
implementation. For example, these work out-of-the-box:

- [Flyd](https://github.com/paldepind/flyd)
- [Mithril Stream](https://mithril.js.org/stream.html)

Use the `stream` property to specify the stream implementation that you want to use. For example:

```js
import flyd from 'flyd'

const cells = setup({ stream: flyd });
```

```js
import Stream from 'mithril/stream';

const cells = setup({ stream: Stream });
```

You can use any other stream library as long as you adapt it by providing an object with a `stream`
and a `scan` property, which indicate the functions to create a stream and to scan a stream:

```js
import someStream from 'some-stream-library';

const someStreamLib = {
  stream: someStream.createStream,
  scan: someStream.scan
};

const cells = setup({ stream: someStreamLib })
```

Also, the stream returned when creating a stream must have a `map` function.

Adapting a different stream library is usually not necessary, since using either `simple-stream`,
`Flyd`, or `Mithril Stream` should be suitable.

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
