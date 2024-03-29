# [Meiosis](https://meiosis.js.org) Documentation

@docs-nav-start
@nav-prev:01-introduction.html:Introduction
@nav-toc
@nav-next:03-streams.html:Streams
@docs-nav-end

## Initial State and Actions

Meiosis is a pattern for managing application state. The idea is to have a top-level state object,
and simple ways to update the state.

Let's imagine a simple counter example. Our initial state might be:

```js
const initial = {
  value: 0
};
```

That is, a plain JavaScript object with a `value` property indicating the value of the counter.

Now, we want to create an action that increments the counter.

<a name="increment_action"></a>
### [Increment Action](#increment_action)

We'll create an `actions` object with an `increment` function that increments the counter.

```js
const initial = {
  value: 0
};

const actions = {
  increment: () => {
    initial.value = initial.value + 1;
  }
};
```

We now have an initial state and an actions object to update the state. However, this approach is
somewhat lacking: we are directly modifying a global variable. This forces the actions to have a
reference to the global variable. Moreover, it gives us no control over the flow of data - being
able to know when something has changed so that we can react. Most notably, we'll want to refresh
the view when the state has been updated.

In the next section, we'll look at a way to gain control over the flow of data. When you are ready,
continue on to [Streams](03-streams.html).

@docs-nav-start
@nav-prev:01-introduction.html:Introduction
@nav-toc
@nav-next:03-streams.html:Streams
@docs-nav-end
