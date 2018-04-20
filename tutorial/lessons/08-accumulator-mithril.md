# Meiosis Tutorial

[Table of Contents](toc.html)

## 08 - Accumulator

In the previous lesson, [07 - Stream Library](07-stream-lib-mithril.html), we used
[mithril-stream](https://mithril.js.org/stream.html) instead of our own stream implementation.
Another good choice is [flyd](https://github.com/paldepind/flyd).

From this point on, I will use [mithril-stream](https://mithril.js.org/stream.html). Of course,
our own implementation works fine as well, so feel free to use that if you prefer to have less
external dependencies and more control over the source code.

### Model and accumulator function

Our example so far has been a simple counter. The model was just a number, representing the
counter's value. The accumulator function took updates and did some simple math to produce the
updated model.

Obviously, for more complex examples, we will need more than just a number as the model. We will
need an object with properties. For example, let's say we had a temperature with a value and the
units, Celsius or Farenheit. We could represent the model as:

```js
{
  value: 22,
  units: "C"
}
```

Not only can we increase or decrease the value, we can also change the units between `C` and
`F`. Changing the units should automatically change the value to the equivalent in the units
to which we are switching.

The accumulator function needs to produce an updated model object. It's our choice how we want
to issue updates and handle them in the accumulator function.

### Using `Object.assign`

One way to issue updates and handle them in the accumulator function is with `Object.assign`.
This method copies properties from one or more source objects to a target object. For example:

```js
                           // target object           source object
var result = Object.assign({ value: 22, units: "C" }, { value: 24 });
// result is { value: 24, units: "C" }
```

As you can see, `Object.assign` copies over properties from the source object to the target
object, and leaves untouched any properties that are in the target but not the source.

If we issue source objects onto our `update` stream, we can use `Object.assign` to update the
model in the accumulator function:

```js
var models = m.stream.scan(
  function(model, value) {
    return Object.assign(model, value);
  }, { value: 22, units: "C" }, update);
```

Our initial model is `{ value: 22, units: "C" }` and the accumulator function calls
`Object.assign` to update the model. Thus, we could call `update({ value: 21 })` to set the
temperature `value` to `21` and keep the same units.

### Passing functions as parameters

But wait! Notice the accumulator function that we are passing as a parameter to `scan`:

```js
function(model, value) {
  return Object.assign(model, value);
}
```

We have a function that takes `(model, value)` and calls `Object.assign` with `(model, value)`.
But `Object.assign` already does what we want, so we can pass it directly to `scan`:

```js
var models = m.stream.scan(Object.assign,
  { value: 22, units: "C" }, update);
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
parameters. There is no need to create that outer function - you can instead just pass
`someFunction` directly:

```js
callSomething(someFunction);
```

Passing functions as parameters is very useful!

### Building out the example

Our temperature example will display the current temperature's value and units.
The value can be changed with `Increase` and `Decrease` buttons. The units can be switched
between Celsius and Farenheit with a `Change Units` button. When changing the units, the
value is converted to the new units.

Here is the example:

@flems mithril/08-accumulator.js,app.html,app.css mithril,mithril-stream 800

As you can see, `convert` is just a matter of simple math to convert the temperature value
between units.

We pass the current model to both `increase` and `changeUnits` so that they can use the current
model values to determine how to change the temperature value and units. Then, those functions
call `update()`, passing an object that represents how we want to change the model. Since the
accumulator function uses `Object.assign`, the objects that we pass to `update` will be merged
in with the current model to produce the updated model.

### Exercise

- Add a `Reset` button that resets the temperature. If the current temperature is in Celsius,
the temperature should be reset to `22`. For Farenheit, the reset button should set the
temperature to `72`.

When you are ready, continue on to [09 - Nesting](09-nesting-mithril.html).

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
