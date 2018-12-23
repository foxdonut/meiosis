# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 06 - Components

Let's combine the Meiosis pattern that we assembled at the end of
[04 - Streams](04-streams-mithril.html) with [05 - Patchinko](05-patchinko-mithril.html).

We'll change the counter to a temperature example with a state shaped as follows:

```js
{
  value: 22,
  units: "C"
}
```

Previously, we were emitting patches onto the `update` stream in the form of numbers that
represented the amount by which to increment the counter. Now, our patches will instead be
Patchinko patches, giving us a much more powerful way to update the state and giving us a
general-purpose approach.

To increment the temperature value, we can use a patch as follows:

```js
increment: function(amount) {
  update({ value: S(current => current + amount) });
}
```

We can also convert the temperature between Celsius and Farenheit:

```js
var convert = function(value, to) {
  return Math.round(
    (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
  );
};

changeUnits: function(state) {
  var newUnits = state.units === "C" ? "F" : "C";
  var newValue = convert(state.value, newUnits);
  update({ value: newValue, units: newUnits });
}
```

So now `update` is a stream of Patchinko patches. To handle them in the accumulator function
and produce a stream of updated states, we can use `P`:

```js
var states = m.stream.scan(function(state, patch) {
  return P(state, patch);
}, app.initialState, update);
```

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

Putting it all together, we have the example shown below.

@flems mithril/06-components-01.js,app.html,app.css patchinko,mithril,mithril-stream 800

### Building Components

When building components with the Meiosis pattern, we split code into two separate concerns:

- **State management** code - initial state, actions that update the state
- **View** code - view components that display the UI based on the state, and call actions.

How you group together the code is up to you. In some cases, it might make sense to put state
management and view code together into a folder for a component of your application. In other
cases, you may prefer to have view components separate from the code that manages state.

Let's change our previous example to move the code into a "temperature" component.

```js
{
  temperature: {
    value: 22,
    units: "C"
  }
}
```

-----

@flems mithril/06-components-02.js,app.html,app.css patchinko,mithril,mithril-stream 800

@flems mithril/06-components-03.js,app.html,app.css patchinko,mithril,mithril-stream 800

@flems mithril/06-components-04.js,app.html,app.css patchinko,mithril,mithril-stream 800

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
