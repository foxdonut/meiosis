# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](06-cells.html) |
[Next >](08-using-preact.html) |
[Table of Contents](toc.html)

## 07 - Using Mithril

In the previous lessons, we set up the Meiosis pattern with a temperature example.
In this section, we'll wire this up to [Mithril](https://mithril.js.org/).

<a name="mithril_stream"></a>
### [Mithril Stream](#mithril_stream)

First, we can use [Mithril Stream](https://mithril.js.org/stream.html) as a stream library. For our
purposes, it works just like `flyd`. The only difference is that you call `m.stream()` instead of
`flyd.stream()`, and `m.stream.scan` instead of `flyd.scan`.

<a name="wiring_meiosis"></a>
### [Wiring Meiosis](#wiring_meiosis)

Next, remember that in the previous section, we set up a stream of cells:

```js
const cells = states.map((state) => ({ state, update }));
```

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
      ),
      m(
        'button',
        { onclick: () => actions.changeUnits(cell) },
        'Change Units'
      )
    )
  );
```

Notice that the `onclick` handlers call actions, passing `cell` and any needed additional
parameters.

You can see the complete example below.

@flems {"files":"code/07-using-mithril-01.js,app.html,app.css","libs":"mithril,mithril-stream,mergerino","height":800,"middle":60}

<a name="takeaways"></a>
### [Takeaways](#takeaways)

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

<a name="conclusion"></a>
### [Conclusion](#conclusion)

FIXME

[< Previous](06-cells.html) |
[Next >](08-using-preact.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut) and is released under the MIT license.
