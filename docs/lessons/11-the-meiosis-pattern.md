# [Meiosis](https://meiosis.js.org) Documentation

@docs-nav-start
@nav-prev:10-preventing-re-renders.html:Preventing Re-Renders
@nav-toc
@nav-next:12-whats-next.html:What's Next?
@docs-nav-end

## The Meiosis Pattern Cheatsheet

> Meiosis is a pattern that you can set up yourself, but by popular demand
[meiosis-setup](https://meiosis.js.org/setup) is now available for your convenience. The library
includes additional features including TypeScript support and nested services and views.

### Meiosis Pattern

Here is the code to set up the Meiosis Pattern with function patches:

```js
import flyd from 'flyd';

import { app } from './app';

const update = flyd.stream();
const states = flyd.scan((state, patch) => patch(state), app.initial, update);
const createCell = (state) => ({ state, update });
const cells = states.map(createCell);
```

With Mergerino:

```js
import flyd from 'flyd';
import merge from 'mergerino';

import { app } from './app';

const update = flyd.stream();
const states = flyd.scan(merge, app.initial, update);
const createCell = (state) => ({ state, update });
const cells = states.map(createCell);
```

To add services:

```js
import flyd from 'flyd';
import merge from 'mergerino';

import { app } from './app';

const dropRepeats = (states, onchange = (state) => state) => {
  let prev = undefined;
  const result = stream();

  states.map((state) => {
    const next = onchange(state);
    if (next !== prev) {
      prev = next;
      result(state);
    }
  });
  return result;
};

const update = stream();
const states = stream.scan(merge, app.initial, update);
const createCell = (state) => ({ state, update });

app.services.forEach((service) => {
  dropRepeats(states, service.onchange).map((state) => service.run(createCell(state)));
});

const cells = dropRepeats(states).map(createCell);
```

To add nesting with function patches:

```js
import flyd from 'flyd';

import { app } from './app';

const nestPatch = (patch, prop) => (state) =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });

const nestUpdate = (parentUpdate, prop) => (patch) => parentUpdate(nestPatch(patch, prop));

const nestCell = (getState, parentUpdate) => (prop) => {
  const getNestedState = () => getState()[prop];
  const nestedUpdate = nestUpdate(parentUpdate, prop);

  return {
    state: getNestedState(),
    update: nestedUpdate,
    nest: nestCell(getNestedState, nestedUpdate)
  };
};

const update = flyd.stream();
const states = flyd.scan((state, patch) => patch(state), app.initial, update);

const nest = nestCell(states, update);
const createCell = (state) => ({ state, update, nest });
const cells = states.map(createCell);
```

To add nesting with Mergerino:

```js
import flyd from 'flyd';
import merge from 'mergerino';

import { app } from './app';

const nestPatch = (patch, prop) => ({ [prop]: patch });

const nestUpdate = (parentUpdate, prop) => (patch) => parentUpdate(nestPatch(patch, prop));

const nestCell = (getState, parentUpdate) => (prop) => {
  const getNestedState = () => getState()[prop];
  const nestedUpdate = nestUpdate(parentUpdate, prop);

  return {
    state: getNestedState(),
    update: nestedUpdate,
    nest: nestCell(getNestedState, nestedUpdate)
  };
};

const update = flyd.stream();
const states = flyd.scan(merge, app.initial, update);

const nest = nestCell(states, update);
const createCell = (state) => ({ state, update, nest });
const cells = states.map(createCell);
```

Of course, you can have both services and nesting.

### Views

Here is the code to wire up Meiosis to Mithril:

```js
import m from 'mithril';

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});

cells.map(() => m.redraw());
```

To wire up Meiosis to Preact:

```js
import { render } from 'preact';

const element = document.getElementById('app');
cells.map((cell) => {
  render(app.view(cell), element);
});
```

To wire up Meiosis to React:

```js
import { render } from 'react-dom';

const element = document.getElementById('app');
cells.map((cell) => {
  render(app.view(cell), element);
});
```

Starting with React 18:

```js
import { createRoot } from 'react-dom/client';

const root = createRoot(element);
cells.map((cell) => {
  root.render(app.view(cell));
});
```

@docs-nav-start
@nav-prev:10-preventing-re-renders.html:Preventing Re-Renders
@nav-toc
@nav-next:12-whats-next.html:What's Next?
@docs-nav-end

