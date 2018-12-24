# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 02 - Initial State and Actions

In the previous lesson, [02 - View Function](02-view-function-mithril.html), we passed a `state`
attribute to the `view` function so that we could render according to the state.

Now, how do we make a change to the state and refresh the view?

Our state is a counter that has a value of `0`. Let's add a button to increment the counter.

### Increment Action

Before adding the button itself, we'll create an `actions` object with an `increment` function
that increments the counter.

```javascript
var state = {
  value: 0
};

var actions = {
  increment: function() {
    state.value = state.value + 1;
  }
};
```

We'll be able to call this action from the view.

### Increment Button

We can add a `+1` button with this code:

```js
m("button", { onclick: () => actions.increment() }, "+1")
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
      m("div", "Counter: " + state.value),
      m("button", { onclick: () => actions.increment() }, "+1")
    ];
  }
};
```

Clicking on the button calls `actions.increment()`, which adds `1` to `state.value`.

### Mithril's Auto-Redraw System

After clicking on the `+1` button, the `increment` function updates the state by adding 1. How
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

1. Add a `-1` button that decrements the value by 1.

### Solution

@flems mithril/03-update-state-solution.js,app.html,app.css mithril 750 hidden

When you are ready, continue on to [03 - Streams](03-streams.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
