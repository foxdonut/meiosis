# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](02-initial-state-and-actions.html) |
[Next >](04-meiosis-with-function-patches.html) |
[Table of Contents](toc.html)

## 03 - Streams

In the previous lesson, [02 - Initial State and Actions](02-initial-state-and-actions.html), we
created an `increment` function to update the application state. The function changed the state
by directly modifying a global variable.

This works, but we can improve the approach. Namely, we'd like to gain more control over the
flow of data and how we make changes to the state. We can do this by using a **stream**. A
stream is a nice and simple way to **communicate values** and to control data flow.

<a name="introducing_streams"></a>
### [Introducing Streams](#introducing_streams)

> If you already know about streams and are comfortable with them, great. But, if you have
glanced at streams elsewhere and found them overly complicated, **please forget all of that**
because the streams that we use here are very simple. In fact, we only use two stream operators,
`map` and `scan`, and only to set up the Meiosis pattern at the starting point of the
application.

A stream is a **sequence of values**, similar to an array. Over time, you can send values onto
a stream. You can also have functions that get called every time a value arrives on the stream.

Let's say we create a stream called `update`. When we call `update(1)`, `update(-1)`, and so on,
these values will be in a stream.

![Stream](03-streams-01.svg)

We can pass values, objects, and even functions onto a stream.

<a name="stream_map"></a>
### [Stream `map`](#stream_map)

The way to **do** something with the values that arrive on the stream is by calling `map`. We
pass a **function** as a parameter to `map`, and that function gets called every time a new
value arrives onto the stream. The **result** of calling `map` is a **new stream** with the
values **returned by the function**.

![Map Stream](03-streams-02.svg)

Although `map` produces a new stream, we don't always need it. The function that we pass may not
return anything that we need to use. We can also use `map` to **do** something with the values
(also known as **side effects**).

<a name="stream_library_flyd"></a>
### [A simple stream library: flyd](#stream_library_flyd)

We will use [flyd](https://github.com/paldepind/flyd) as our stream library. You can also use
another stream library simply by using its equivalents of:
- pushing a value onto a stream
- getting the latest value from a stream
- `map`
- `scan`, which we will look at later on in this lesson.

To create a stream with flyd, we simply call `flyd.stream()`:

```js
var update = flyd.stream();
```

To push a value onto the stream, we call it as a function and pass the value:

```js
update(1);
```

To get the latest value from a stream, we call it as a function with no parameters:

```js
var value = update();
// value is 1
```

We can call `map` on the created stream, passing a function that will get called for
every value that arrives onto the stream. The call to `map` returns a new stream.

```js
// otherStream is every value from the update stream plus ten
var otherStream = update.map(function(value) {
  return value + 10;
});
// display every value from the otherStream onto console.log
// here we are doing something with every value, but not returning anything.
// we are also ignoring the stream returned by otherStream.map(...).
otherStream.map(function(value) {
  console.log(value);
});
```

I invite you to get familiar with streams. Using the code box below, which has `flyd`
already loaded, try the exercises.

@flems code/03-streams-01.js flyd 550

<a name="exercises_1"></a>
### [Exercises](#exercises_1)

1. Create an `update` stream.
1. Create a `timesTen` stream that is the result of multiplying by ten each value from the
`update` stream.
1. Create a `plusTwo` stream that is the result of adding two to each value from the
`timesTen` stream.
1. Map a function to the `plusTwo` stream that outputs each value using `console.log`.
1. Verify that everything is working by calling `update(1)` and `update(2)` and seeing
`12` and `22` on the console log.

<a name="solution_1"></a>
### [Solution](#solution_1)

@flems code/03-streams-01-solution.js flyd 800 hidden

<a name="stream_scan"></a>
### [Stream `scan`](#stream_scan)

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
var update = flyd.stream();
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

![Scan](03-streams-03.svg)

<a name="using_scan"></a>
### [Using `scan`](#using_scan)

Now that have we streams, `map`, and `scan`, we can use them to manage our application state.
Previously, we had:

```js
var initial = {
  value: 0
};

function Actions() {
  return {
    increment: function() {
      initial.value = initial.value + 1;
    }
  };
}
```

We can incorporate streams to manage the flow of data:

- We create an `update` stream, and pass it to `Actions`.
- To update the state, an action passes a value onto the `update` stream, indicating a state
change. We'll call this a **patch**. In our example, the patches are numbers by which to
increment the value of the counter.
- Using `scan`, we create a stream of states, starting with the initial state and incrementing
the counter by the values coming in on the `update` stream.
- Using `map`, we'll display the latest state.

Here are our changes:

```js
var app = {
  initial: {
    value: 0
  },
  Actions: function(update) {
    return {
      increment: function() {
        update(1);
      },
      decrement: function() {
        update(-1);
      }
    };
  }
};

var update = flyd.stream();
var states = flyd.scan(function(state, increment) {
  state.value = state.value + increment;
  return state;
}, app.initial, update);

var actions = app.Actions(update);
states.map(function(state) {
  document.write("<pre>" + JSON.stringify(state) + "</pre>");
});
```

The `states` stream starts with the initial state, `{ value: 0 }`. Every time a number arrives
onto the `update` stream, the accumulator function adds that number to `state.value`. We have a
stream of states, and the actions can change the value by pushing a patch (in this case, a number)
onto the `update` stream.

Putting it all together, we have the complete example as shown below.

@flems code/03-streams-02.js flyd 800

<a name="exercises_2"></a>
### [Exercises](#exercises_2)

Try it out: notice that `{"value":0}` appears in the output on the right. This is our initial
state. Now, within the console, type and then press Enter:

`actions.increment()`

In the output on the right, you will see `{"value":1}` appear, showing that the state has
been updated. Try `actions.increment()` again and also `actions.decrement()`.

We are starting to implement the Meiosis pattern:

- an `update` stream
- actions push **patches** onto the `update` stream
- a `states` stream that `scan`s the `update` stream, starting with an initial state and
applying patches to the state with an **accumulator** function
- a `map` on the `states` stream to display the stream of states.

You've probably noticed that our patches and our accumulator function are pretty limited.
Indeed, our patches are just numbers, and all the accumulator function does is add the
number to the state value. In the upcoming sections, we will look at more general-purpose
patches and accumulator functions, fully implementing the Meiosis pattern in the process.

> **A Note about Using Mithril Streams**:
if you're using Mithril as a view library, you can use
[Mithril Stream](https://mithril.js.org/stream.html) as a stream library. For our purposes,
it works just like `flyd`. The only difference is that you call `m.stream()` instead of
`flyd.stream()`, and `m.stream.scan` instead of `flyd.scan`.

When you are ready, continue on to
[04 - Meiosis with Function Patches](04-meiosis-with-function-patches.html).

[< Previous](02-initial-state-and-actions.html) |
[Next >](04-meiosis-with-function-patches.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
