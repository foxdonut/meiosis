# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](08-services.html) |
[Next >](10-preventing-re-renders.html) |
[Table of Contents](toc.html)

## 09 - Nesting

Until now, we have been using Meiosis cells with `cell.state` to access the application state and
`cell.update(...)` to update the state. Every view and action has access to the complete application
state.

Sometimes it is useful to pass a **nested** cell, that is, a nested part of the application state.
In that case, `cell.state` returns that nested state instead of the full application state, and
`cell.update` updates that nested state. Views and actions only need to be concerned with that part
of the state, and need not have knowledge about the details of the rest of the application state.

This separation of concerns is not only good for dividing views and actions into smaller components,
it makes it easier to re-use a component multiple times in an application. We can pass nested cells
to each component, where each nested cell is in a different part of the application state but has
the same data structure.

### Using Nesting Cells

Our goal is to add a `nest` function to cells so that instead of passing a cell to a view:

```js
component.view(cell)
```

We can pass a nested cell to a view by indicating a property:

```js
component.view(cell.nest('someProp'))
```

This passes a nested cell to the view such that `cell.state` returns the `someProp` part of the
application state and `cell.update(...)` updates that part of the state. Views and actions don't
need to know about `someProp`, only about the data structure under `someProp`.

Cells are nested one property at a time, but we can still nest at a deeper level by calling `.nest`
multiple times, for example:

```js
temperature.view(cell.nest('temperature').nest('air'))
temperature.view(cell.nest('temperature').nest('water'))
```

In this case, the application state would include a structure as shown below:

```js
{
  temperature: {
    air: { ... },
    water: { ... }
  }
}
```

We would be using two instances of `temperature`, each with their state nested in a separate part of
the application state.

### Nesting Patches and Updates

The first thing we need to do is to write a function to **nest a patch**. That is, given a patch and
a property, we need to nest the patch at the property. This will enable us to have components that
use a nested cell call `cell.update(...)` and update the application at the property that was used
to nest the cell.

For function patches, here is the `nestPatch` function:

```js
const nestPatch = (patch, prop) => (state) =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });
```

The function returns a new function patch that updates the state by updating at the nested property
and passing the nested state to the `patch` function.

With Mergerino, the `nestPatch` function simply creates an object with the property and the patch:

```js
const nestPatch = (patch, prop) => ({ [prop]: patch });
```

Using this `nestPatch` function, we can write a function for nesting an update:

```js
const nestUpdate = (parentUpdate, prop) => (patch) =>
  parentUpdate(nestPatch(patch, prop));
```

### Nesting Cells

With these functions we are ready to write a function for nesting a cell:

```js
const nestCell = (getState, parentUpdate) => (prop) => {
  const getNestedState = () => getState()[prop];
  const nestedUpdate = nestUpdate(parentUpdate, prop);

  return {
    state: getNestedState(),
    update: nestedUpdate,
    nest: nestCell(getNestedState, nestedUpdate)
  };
};
```

```js
const nestPatch = (patch, prop) => (state) =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });

const nestUpdate = (parentUpdate, prop) => (patch) =>
  parentUpdate(nestPatch(patch, prop));

const nestCell = (getState, parentUpdate) => (prop) => {
  const getNestedState = () => getState()[prop];
  const nestedUpdate = nestUpdate(parentUpdate, prop);

  return {
    state: getNestedState(),
    update: nestedUpdate,
    nest: nestCell(getNestedState, nestedUpdate)
  };
};

const update = stream();
const states = scan(
  (state, patch) => patch(state),
  app.initial,
  update
);
const nest = nestCell(states, update);
const createCell = (state) => ({ state, update, nest });
const cells = states.map(createCell);
```

With Mergerino, the setup is the same except for the `nestPatch` function:

```js
const nestPatch = (patch, prop) => ({ [prop]: patch });
```

@flems {"files":"code/09-nesting.jsx,app.html,public/css/bootstrap.min.css","libs":"flyd,lodash-fp,preact","height":700,"middle":70}

[< Previous](08-services.html) |
[Next >](10-preventing-re-renders.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](https://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
