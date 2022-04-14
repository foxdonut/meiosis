# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](06-cells.html) |
[Next >](08-services.html) |
[Table of Contents](toc.html)

## 07 - Views

In the previous lessons, we set up the Meiosis pattern with a temperature example. In this section,
we'll wire this up to three different view libraries:

- [Mithril](https://mithril.js.org/)
- [Preact](https://preactjs.com)
- [React](https://reactjs.org)

### Actions

We had an `actions` object to update the state. To simplify, let's just have the `increment` action:

```js
const actions = {
  increment: (cell, amount) =>
    cell.update({ value: (x) => x + amount })
};
```

> This example uses Mergerino, but of course you can also use function patches if you prefer.

The view can call `actions.increment` to trigger updates.

### Cells

Next, remember that in the previous section, we set up a stream of cells:

```js
const createCell = (state) => ({ state, update });
const cells = states.map(createCell);
```

We can call `cells()` to get the current cell, or we can use `cells.map(cell => ...)` to render the
view on every update.

### Mithril

#### Mithril Stream

First, we can use [Mithril Stream](https://mithril.js.org/stream.html) as a stream library. For our
purposes, it works just like `flyd`. The only difference is that you call `m.stream()` instead of
`flyd.stream()`, and `m.stream.scan` instead of `flyd.scan`.

#### Wiring Meiosis

Now, we'll use `m.mount` and a minimal Mithril component to render the view. We'll pass the
current cell to the view:

```js
m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});
```

We are calling `cells()` to get the latest cell from the stream and pass to the view.

With Mithril's [auto-redraw system](https://mithril.js.org/autoredraw.html), the view is
automatically re-rendered after user interaction.

#### View

The view is a function that gets the current `cell` as a parameter, from which the current state is
available as `cell.state`. Mithril is used to render the view:

```js
const view = (cell) =>
  m(
    'div',
    m(
      'div',
      m(
        'label',
        'Temperature: ',
        cell.state.value,
        m.trust('&deg;'),
        cell.state.units
      )
    ),
    m(
      'div',
      m(
        'button',
        { onclick: () => actions.increment(cell, 1) },
        'Increment'
      ),
      m(
        'button',
        { onclick: () => actions.increment(cell, -1) },
        'Decrement'
      )
    )
  );
```

Notice that the `onclick` handlers call actions, passing `cell` and any needed additional
parameters.

You can see the complete example below.

@flems {"files":"code/07-mithril.js,app.html,app.css","libs":"mithril,mithril-stream,mergerino","height":800,"middle":60}

#### Takeaways

We can wire up Meiosis to Mithril using `m.mount` and the latest value of the `cells` stream to the
view.

Then, all Mithril views in the application are consistent: they all receive `cell`. When rendering
other components, `cell` is passed along.

Components can then use the `cell.state` to render the view according to the current application
state, and call `actions` to trigger changes. Views could also call `cell.update(...)` for simple
state changes.

Because of Mithril's [auto-redraw system](https://mithril.js.org/autoredraw.html), the view is
automatically re-rendered. Of course, if you trigger state changes outside of Mithril's auto-redraw
(see
[When Mithril does not redraw](https://mithril.js.org/autoredraw.html#when-mithril-does-not-redraw)) you have to call `m.redraw()` yourself.

<a name="preact"></a>
### [Preact](#preact)

Now, we'll use `cells.map` to render the view whenever the state changes. We'll use `preact.render`
and a minimal Preact component to render the view, passing the current cell to the view:

```js
const element = document.getElementById('app');
cells.map((cell) => {
  preact.render(app.view(cell), element);
});
```

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
    </div>
  </div>
);
```

Notice that the `onClick` handlers call actions, passing `cell` and any needed additional
parameters.

You can see the complete example below.

@flems {"files":"code/07-preact.jsx,app.html,app.css","libs":"flyd,preact,mergerino","height":800,"middle":60}

<a name="react"></a>
### [React](#react)

Now, we'll use `cells.map` to render the view whenever the state changes. We'll use
`ReactDOM.render` and a minimal Preact component to render the view, passing the current cell to the
view:

```js
const element = document.getElementById('app');
cells.map((cell) => {
  ReactDOM.render(app.view(cell), element);
});
```

You can see the complete example below.

@flems {"files":"code/07-react.jsx,app.html,app.css","libs":"flyd,react,react-dom,mergerino","height":800,"middle":60}

<a name="conclusion"></a>
### [Conclusion](#conclusion)

FIXME

[< Previous](06-cells.html) |
[Next >](08-using-preact.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
