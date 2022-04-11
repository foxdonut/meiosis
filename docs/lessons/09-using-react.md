# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](08-using-preact.html) |
[Next >](10-services.html) |
[Table of Contents](toc.html)

## 09 - Using React

In the previous lessons, we set up the Meiosis pattern with a temperature example.
In this section, we'll wire this up to [React](https://reactjs.org/).

<a name="wiring_meiosis"></a>
### [Wiring Meiosis](#wiring_meiosis)

Remember that in the previous section, we set up a stream of cells:

```js
const createCell = (state) => ({ state, update });
const cells = states.map(createCell);
```

Now, we'll use `cells.map` to render the view whenever the state changes. We'll use
`ReactDOM.render` and a minimal Preact component to render the view, passing the current cell to the
view:

```js
const element = document.getElementById('app');
cells.map((cell) => {
  ReactDOM.render(app.view(cell), element);
});
```

<a name="the_actions"></a>
### [Actions](#the_actions)

Remember that we had an `actions` object to update the state:

```js
const actions = {
  increment: (cell, amount) =>
    cell.update({ value: (x) => x + amount }),

  changeUnits: (cell) =>
    cell.update(
      cell.state.units === 'C'
        ? {
            units: 'F',
            value: (value) => Math.round((value * 9) / 5 + 32)
          }
        : {
            units: 'C',
            value: (value) => Math.round(((value - 32) / 9) * 5)
          }
    )
};
```

> This example uses Mergerino, but of course you can also use function patches if you prefer.

The view can call `actions.increment` and `actions.changeUnits` to trigger updates.

<a name="the_view"></a>
### [View](#the_view)

The view is a function that gets the current `cell` as a parameter, from which the current state is
available as `cell.state`. JSX is used to render the view:

```js
const view = (cell) => (
  <div>
    <div>
      <label>
        Temperature: {cell.state.value}&deg;{cell.state.units}
      </label>
    </div>
    <div>
      <button onClick={() => actions.increment(cell, 1)}>
        Increment
      </button>
      <button onClick={() => actions.increment(cell, -1)}>
        Decrement
      </button>
      <button onClick={() => actions.changeUnits(cell)}>
        Change Units
      </button>
    </div>
  </div>
);
```

Notice that the `onClick` handlers call actions, passing `cell` and any needed additional
parameters.

You can see the complete example below.

@flems {"files":"code/09-using-react-01.jsx,app.html,app.css","libs":"flyd,react,react-dom,mergerino","height":800,"middle":60}

<a name="takeaways"></a>
### [Takeaways](#takeaways)

We can wire up Meiosis to React using `render` and the latest value of the `cells` stream to the
view.

Then, all React views in the application are consistent: they all receive `cell`. When rendering
other components, `cell` is passed along.

Components can then use the `cell.state` to render the view according to the current application
state, and call `actions` to trigger changes. Views could also call `cell.update(...)` for simple
state changes.

<a name="conclusion"></a>
### [Conclusion](#conclusion)

FIXME

[< Previous](08-using-preact.html) |
[Next >](10-services.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.