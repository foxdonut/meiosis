# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 04 - Streams

In the previous lesson, [03 - Update State](03-update-state-react.html), we created an `increase`
function to update the application state. We passed React's `setState` to the actions as a
callback so that the view gets refreshed after updating the state.

This works, but we can improve the approach. Namely, we'd like to gain more control over the
flow of data and how we make changes to the state. We can do this by using a **stream**. A
stream is a nice and simple way to **communicate values** and to control the flow of data.

### Introducing Streams

> If you already know about streams and are comfortable with them, great. But, if you have
glanced at streams elsewhere and found them overly complicated, **please forget all of that**
because the streams that we use here are very simple. In fact, we only use two stream operators,
`map` and `scan`, and only to set up the Meiosis pattern at the starting point of the
application.

A stream is a **sequence of values**, similar to an array. Over time, you can send values onto
a stream. You can also have functions that get called every time a value arrives on the stream.

Let's say we create a stream called `update`. When we call `update(1)`, `update(-1)`, and so on,
these values will be in a stream.

![Stream](04-streams-02.svg)

We can pass values, objects, and even functions onto a stream.

### Stream `.map`

The way to **do** something with the values that arrive on the stream is by calling `.map()`. We
pass a **function** as a parameter to `.map()`, and that function gets called every time a new
value arrives onto the stream. The **result** of calling `.map()` is a **new stream** with the
values **returned by the function**.

![Map Stream](04-streams-03.svg)

Although `map` produces a new stream, we don't always need it. The function that we pass may not
return anything that we need to use. We can also use `map` to **do** something with the values
(also known as **side effects**).

### A simple stream library: flyd

We will use [flyd](https://github.com/paldepind/flyd) as our stream library. You can also use
another stream library simply by using its equivalents of:
- pushing a value onto a stream
- `map`
- `scan`, which we will look at later on in this lesson.

To create a stream with flyd, we simply call `flyd.stream()`:

```javascript
var update = flyd.stream();
```

Then we can call `.map` on the created stream, passing a function that will get called for
every value that arrives onto the stream. The call to `.map` returns a new stream.

I invite you to get familiar with streams. Using the code box below, which has `flyd`
already loaded, try the exercises.

@flems react/04-streams-01.js flyd 550

### Exercises

1. Create an `update` stream.
1. Create a `timesTen` stream that is the result of multiplying by ten each value from the
`update` stream.
1. Create a `plusTwo` stream that is the result of adding two to each value from the
`timesTen` stream.
1. Map a function to the `plusTwo` stream that outputs each value using `console.log`.
1. Verify that everything is working by calling `update(1)` and `update(2)` and seeing
`12` and `22` on the console log.

### Solution

@flems react/04-streams-01-solution.js flyd 800 hidden

### Stream `.scan`

The other stream function that we'll use is called `scan`. Stream libraries have a number of
other functions (also called operators), ranging from a handful to an
overwhelming amount! But, we **only** need `map` and `scan`, and we only need them to set up
the Meiosis pattern.

Like `map`, `scan` takes a source stream and produces a new stream. Remember that with `map`,
whenever a new value arrives on the source stream, the function that we passed to `map` gets
called, and the result is the next value on the new stream.

With `scan`, instead of passing a function of one parameter, we pass a function of **two**
parameters. This function is called an **accumulator**.

When a new value arrives on the source stream, the accumulator function gets called with the
**latest** result that we returned, and the incoming value from the source stream. The result that
we return from the accumulator function is the next value on the new stream, **and** it also
becomes the **latest** result.

Finally, since at first there is no latest result, we pass to `scan` an **initial value**, which
becomes starting point for the latest result, and the first value on the new stream.

Let's look at an example. Say we start with an `update` stream:

```js
var update = stream();
```

Next, we create an `otherStream` with `scan`:

```js
var otherStream = flyd.scan(function(latest, next) {
  return latest + next;
}, 0, update);
```

As you can see, we need to pass three parameters to `scan`:

- The accumulator function. Here, the function adds the next value coming in from `update` to the
latest value.
- The initial value, `0`. So, `otherStream` will start with a value of `0`.
- The source stream, `update`.

If we call `update(5)`, the next value on `otherStream` will be `0 + 5 = 5`. If we then call
`update(-3)`, now the latest value is `5`, the next value is `-3`, and the result is `5 + -3 = 2`.
The sequence continues, always adding the incoming value to the latest result, as illustrated
below:

![Scan](04-scan-01.svg)

### Using `scan`

Now that we have `scan`, we can use it to manage our application state. Previously, we had:

```js
var state = {
  value: 0
};

var actions = function(update) {
  return {
    increase: function() {
      state.value = state.value + 1;
      update(state);
    }
  };
};
```

We can incorporate streams to manage the flow of data:

- Create an `update` stream, and pass it to `actions`.
- To update the state, `actions` passes a value onto the `update` stream.
- Using `scan`, create a stream of states.

Here are our changes:

```js
var actions = function(update) {
  return {
    increase: function() {
      update(1);
    }
  };
};

var update = flyd.stream();
var states = flyd.scan(function(state, increment) {
  state.value = state.value + increment;
  return state;
}, { value: 0 }, update);
```

-----

You can try out the complete example below.

@flems react/06-scan.jsx,app.html,app.css react,react-dom 800

### Exercise

In our example, both the `model` and the values coming in on the `update` stream are numbers.
However, `scan` also works with values of different types.

Keep the `model` as a number, but change the values that are sent on `update` to be objects of the
form `{ oper: "add", value: 1 }`. Use this for the `+1` button.

Change the `-1` button's label to `*2`, and have its `onclick` function call
`update({ oper: "times", value: 2 })`.

Finally, change the accumulator function that is passed to `scan` so that it looks at the object's
`oper` and `value`, and performs the operation on the model accordingly and returns the result.

![Scan with different types](04-scan-02.svg)

### Solution

@flems react/06-scan-solution.jsx,app.html,app.css react,react-dom 800 hidden

When you are ready, continue on to [05 - Function Patches](05-function-patches-react.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
