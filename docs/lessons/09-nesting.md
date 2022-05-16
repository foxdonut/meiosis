# [Meiosis](https://meiosis.js.org) Documentation

| | | |
| ---- | ---- | ---- |
| [&rarrhk; 10 - Preventing Re-Renders](10-preventing-re-renders.html) | [&larrhk; 08 - Services](08-services.html) | [&#8673; Table of Contents](toc.html) |

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

The function gets a function to get the state and a function for updating the parent. It returns a
function that takes the property at which to nest. The result is the nested cell.

To create the nested cell, we get the nested state by getting the state and then the nested `prop` off of the state. We create the `nestedUpdate` function using the `nestUpdate` function that we wrote earlier.

Finally, to be able to nest a cell in turn -- for nesting at deeper levels -- we attach `nest` to
the cell by calling `nestCell` again with the nested functions for getting the state and updating
the parent.

Now, we can add `nest` to our cells:

```js
const nest = nestCell(states, update);
const createCell = (state) => ({ state, update, nest });
const cells = states.map(createCell);
```

### Nesting Example

Let's look at an example that uses nesting. We'll use a weather conditions component that indicates
whether or not there are precipitations, and the sky -- sunny, cloudy, or a mix. We'll also use the
temperature component that we've been using so far -- but in this example, we'll use _two_ instances
of the component, one for air, and one for water temperature.

Here is our initial application state:

```js
{
  "conditions": {
    "precipitations": false,
    "sky": null
  },
  "temperature": {
    "air": {
      "value": 22
    },
    "water": {
      "value": 22
    }
  }
}
```

That is the full application state, but, using nesting, we're able to have components focus on their
state without being tied to the application state structure. So the conditions component is only
concerned with:

```js
{
  "precipitations": false,
  "sky": null
}
```

And each temperature component only deals with:

```js
{
  "value": 22
}
```

We can re-use the temperature component and each one will work with its separate nested state.

When we call the views, we use `cell.nest` to pass a nested cell:

```js
conditions.view(cell.nest('conditions'))
temperature.view(cell.nest('temperature').nest('air'))
temperature.view(cell.nest('temperature').nest('water'))
```

Each component can use `cell.state` and `cell.update` as before, but the nested cells will
automatically return and update the nested state.

Have a closer look, the complete example is below.

@flems {"files":"code/09-nesting.jsx,app.html,public/css/bootstrap-simplex.min.css","libs":"flyd,lodash-fp,preact","height":700,"middle":70}

### Conclusion

In this section, we've augmented our Meiosis pattern setup with nesting. For your convenience, you
can also use the same setup by adding
[meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup#meiosis-setup) to your
project.

In the next section, we'll look at an optional performance enhancement: preventing re-renders.

| | | |
| ---- | ---- | ---- |
| [&rarrhk; 10 - Preventing Re-Renders](10-preventing-re-renders.html) | [&larrhk; 08 - Services](08-services.html) | [&#8673; Table of Contents](toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](https://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
