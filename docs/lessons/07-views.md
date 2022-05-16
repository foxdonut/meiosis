# [Meiosis](https://meiosis.js.org) Documentation

| | | |
| ---- | ---- | ---- |
| [&rarrhk; 08 - Services](08-services.html) | [&larrhk; 06 - Cells](06-cells.html) | [&#8673; Table of Contents](toc.html) |

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

### View

The view is a function that gets the current `cell` as a parameter, from which the current state is
available as `cell.state`. In the view, event handlers (`onclick` or `onClick` in the examples
below) call actions, passing `cell` and any additional parameters.

### Mithril

Let's see how we can wire up Meiosis to [Mithril](https://mithril.js.org/).

First, we can use [Mithril Stream](https://mithril.js.org/stream.html) as a stream library. For our
purposes, it works just like `flyd`. The only difference is that you call `m.stream()` instead of
`flyd.stream()`, and `m.stream.scan` instead of `flyd.scan`.

Then, we use `m.mount` and pass the current cell to the view by calling `cells()`:

```js
m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});
```

The complete example is below.

@flems {"files":"code/07-mithril.js,app.html,app.css","libs":"mithril,mithril-stream,mergerino","height":800,"middle":60}

With Mithril's [auto-redraw system](https://mithril.js.org/autoredraw.html), the view is
automatically re-rendered after user interaction. If our application updates the state outside of
Mithril's auto-redraw scope (see
[When Mithril does not redraw](https://mithril.js.org/autoredraw.html#when-mithril-does-not-redraw)),
we can re-render the view on state updates simply by using `map` on our stream of `cells` and
calling `m.redraw()`:

```js
cells.map(() => m.redraw());
```

<a name="preact"></a>
### [Preact](#preact)

To wire up Meiosis to [Preact](https://preactjs.com), we use `cells.map` to render the view whenever
the state changes. We call `preact.render` to render the view:

```js
const element = document.getElementById('app');
cells.map((cell) => {
  preact.render(app.view(cell), element);
});
```

You can see the complete example below.

@flems {"files":"code/07-preact.jsx,app.html,app.css","libs":"flyd,preact,mergerino","height":800,"middle":60}

<a name="react"></a>
### [React](#react)

Wiring Meiosis to [React](https://reactjs.org) is essentially the same as with Preact, the only
difference is that we use `ReactDOM.render` to render the view:

```js
const element = document.getElementById('app');
cells.map((cell) => {
  ReactDOM.render(app.view(cell), element);
});
```

You can see the complete example below.

@flems {"files":"code/07-react.jsx,app.html,app.css","libs":"flyd,react,react-dom,mergerino","height":800,"middle":60}

> Starting with React 18, `ReactDOM.render(view, element)` has been deprecated in favor of `root =
createRoot(element)` and `root.render(view)`. This doesn't change how to wire up Meiosis aside from
adjusting how to use the React API.

<a name="conclusion"></a>
### [Conclusion](#conclusion)

In this section, we saw how to wire up Meiosis to a view library. Our base Meiosis pattern is
complete!

The remainder of this documentation covers additional functionalities that we can add to Meiosis,
starting with [Services](08-services.html).

| | | |
| ---- | ---- | ---- |
| [&rarrhk; 08 - Services](08-services.html) | [&larrhk; 06 - Cells](06-cells.html) | [&#8673; Table of Contents](toc.html) |

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
