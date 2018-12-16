# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 03 - Update State

In the previous lesson, [02 - View Function](02-view-function-mithril.html), we passed a `state`
attribute to the `view` function so that we could render according to the state.

Now, how do we make a change to the state and refresh the view?

Our state is a counter that has a value of `0`. Let's add a button to increase the counter.

### Increase Action

Before adding the button itself, we'll create an `actions` object with an `increase` function
that increments the counter.

```javascript
var state = 0;

var actions = {
  increase: function() {
    state = state + 1;
  }
};
```

We'll be able to call this action from the view.

### Increase Button

We can add a `+1` button with this code:

```js
m("button", { onclick: () => actions.increase() }, "+1")
```

How does the view get access to `actions`? Just like `state`, we can pass `actions` as an
attribute:

```javascript
m(App, { state: state, actions: actions });
```

Our `App` component is now:

```javascript
var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return [
      m("div", "Counter: " + state),
      m("button", { onclick: () => actions.increase() }, "+1")
    ];
  }
};
```

Clicking on the button calls `actions.increase()`, which adds `1` to the `state`.

### Mithril's Auto-Redraw System

After clicking on the `+1` button, the `increase` function updates the state by adding 1. How
does the view reflect this change?

Mithril has an [auto-redraw system](https://mithril.js.org/autoredraw.html) that automatically
refreshes the view after executing DOM event handlers, such as our `onclick` function. Namely,
it will re-render our top-level component:

```javascript
{
  view: function() {
    return m(App, { state: state, actions: actions });
  }
}
```

Since we are passing `state` to our `App` component, the re-render will pass the updated `state`
and the view will show the incremented counter.

You can see the working code below:

@flems mithril/03-update-state.js,app.html,app.css mithril 550

### Exercises

1. As in the [previous lesson](02-view-function-mithril.html), try passing in an object such as
`{ label: "The Counter", value: 0 }` as the model. Change the `view` function so that it uses the
model to produce the view, and change the `increase` function so that it increases the model value.
1. Add a `-1` button that decreases the value by 1.

### Solution

@flems mithril/03-update-state-solution.js,app.html,app.css mithril 750 hidden

When you are ready, continue on to [04 - Update Function](04-update-function-mithril.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
