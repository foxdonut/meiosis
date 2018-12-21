# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 05 - Patchinko

In the previous lesson, [04 - Streams](04-streams-mithril.html), we started setting up the
Meiosis pattern:

- an `update` stream of **patches**
- a `states` stream of states, obtained with `scan` on the `update` stream and applying
an **accumulator**
- an `actions` object created by passing `update` and having functions that call `update`
to trigger state changes
- a component that receives the latest `state` and the `actions`.

Our state had the following shape:

```js
{
  value: 0
}
```

Our patches were numbers such as `1` and `-1`, and our accumulator applied the patches to the
state by adding the number to `state.value`.

We are going to change our patches and accumulator function to be general-purpose, so that the
shape of our state can be much more flexible, and our actions can issue patches to make all sorts
of changes to the state.

### A Temperature Example

Let's use our previous counter example and change it to a temperature, with a value and the units:

```js
{
  value: 22,
  units: "C"
}
```

We can increase and decrease the value, as well as change the units betwen `C` (Celsius) and
`F` (Farenheit), converting the value in the process.

Here is the example:

@flems mithril/05-patchinko-01.js,app.html,app.css mithril,mithril-stream 800

As you can see, everything is set up except for the action functions and the accumulator function.
Indeed, the actions don't do anything yet, and the accumulator function just returns the state,
unchanged.

We need to:

- Decide the shape of our patches
- Write an accumulator function that will use those patches to produce the updated state.

In this section, we will use one approach (my personal favourite), using a library called
Patchinko. In the [next section](06-function-patches-mithril.html), we will use another
approach, using function patches. The Meiosis pattern is flexible enough that you can use
either of these approaches or even one of your own.

### Introducing Patchinko

[Patchinko](https://github.com/barneycarroll/patchinko) is a brilliant utility that
[Barney Carroll](http://barneycarroll.com/) wrote in just 30-some lines of code. We will
use it to issue patches onto our `update` stream, and to produce the updated state from
our accumulator function.

Imagine that our patches are objects that describe how we want to update the state. If
we want to change the temperature value to 23, we would call:

```js
update({ value: 23 })
```

To change the units:

```js
update({ units: "F" })
```

To convert the value at the same time as changing the units:

```js
update({ value: 72, units: "F" })
```

How to we write an accumulator function that handles these object patches to update the
state?

Remember that the accumulator function gets the current state and the incoming patch as
parameters, and must return the updated state:

```js
function(state, patch) {
  return state;
}
```

Patchinko comes with a function, `P` (for "Patch") that takes a target object as its first
parameter, and patch objects in the remainder of the parameters. It patches the target object
by copying over the properties from the patch objects onto the target object:

```javascript
P(
{ value: 22, units: "C" },
{ value: 23 }
)
// result:
{ value: 23, units: "C" }
```



@flems mithril/05-patchinko-02.js,app.html,app.css patchinko,mithril,mithril-stream 800

### Passing functions as parameters

But wait! Notice the accumulator function we are passing as a parameter to `scan`:

```js
m.stream.scan(function(state, patch) {
  return P(state, patch);
}, app.initialState, update);
```

We have a function that takes `(state, patch)` as calls `P` with `(state, patch)`. The `P`
function already does what we want, so we can pass it directly to `scan`:

```js
m.stream.scan(P, app.initialState, update);
```

Whenever you are passing a function that looks like:

```js
callSomething(
  function(params) {
    return someFunction(params);
  }
);
```

You are creating a function that takes some parameters and calls a function with the same
parameters. There is no need to create that outer function - instead, you can just pass
`someFunction` directly:

```js
callSomething(someFunction);
```

Passing functions as parameters is very useful!

### Patching based on the current value

So far, you may have noticed that `P` works the same as `Object.assign`. This is true,
**unless** the patch contains calls to other Patchinko functions. One of those is `S` (Scope).
`S` allows us to use the current value of the target object to determine the updated value.

We can put `S` to good use when we increment the temperature, by replacing:

```js
increment: function(state, amount) {
  update({ value: state.value + amount });
}
```

with:

```js
increment: function(amount) {
  update({ value: S(current => current + amount) });
}
```

@flems mithril/05-patchinko-03.js,app.html,app.css patchinko,mithril,mithril-stream 800



When you are ready, continue on to [06 - Function Patches](06-function-patches-mithril.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
