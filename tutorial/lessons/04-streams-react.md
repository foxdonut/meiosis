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
because the streams that we use here are very simple. In fact, we only use one stream and only
two stream operators, `map` and `scan`, and only to set up the Meiosis pattern at the starting
point of the application.

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

That being said, you can also use a stream library. It's your choice. In this lesson, we will
use [flyd](https://github.com/paldepind/flyd). You can also use another stream library simply by
using its equivalent of `map`, `scan`, and pushing a value onto a stream.

There are two parts to a stream that we get when calling `var update = stream()`:

1. Calling it as a function, `update(value)`, pushes the value onto the stream.
1. Calling `update.map(someFunction)` creates a new stream. For every `value` that arrives
onto the `update` stream, call `someFunction(value)` and push the result onto the new stream.

@flems common/05-stream-impl.js [] 550

### Exercises

Using the code above, take our stream implementation out for a test drive.

1. Create an `update` stream.
1. Create a `timesTen` stream that is the result of multiplying by ten each value from the
`update` stream.
1. Create a `plusTwo` stream that is the result of adding two to each value from the
`timesTen` stream.
1. Map a function to the `plusTwo` stream that outputs each value using `console.log`.
1. Verify that everything is working by calling `update(1)` and `update(2)` and seeing
`12` and `22` on the console log.

### Solution

@flems common/05-stream-impl-solution.js [] 800 hidden

### Stream `.scan`

Besides `map`, another method called `scan`. In fact, stream
libraries have a number of other methods (also called operators), ranging from a handful to an
overwhelming amount! But, we **only** need `map` and `scan`. Furthermore, we only need to use
them in **one place** - the Meiosis pattern setup code.

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
var otherStream = scan(function(latest, next) {
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

As you can certainly guess, this will fit in nicely for our Meiosis pattern setup code.

As we discussed, `scan` takes an accumulator function, an initial value, and a source stream.
The new stream starts with the initial value. This is also the starting point for the
`accumulated` value, which is the latest result. Then, we `map` on the source stream, passing in
a function that takes the incoming value, calls the `accumulator` function with the latest
`accumulated` value and the incoming value, and pushes the result onto the new stream.

### Putting it all together

Now that we have `scan`, we can improve our Meiosis pattern setup code. Previously, we had:

```js
var model = 0;
var update = stream();
var view = createView(update);

var element = document.getElementById("app");

update.map(function(value) {
  model = model + value;
  ReactDOM.render(view(model), element)
});

ReactDOM.render(view(model), element)
```

We can make these improvements:

- No longer have a `model` variable that we keep reassigning. Instead, our accumulator function
can be cleaner and more self-contained: it can receive the latest model and the next value, and
return the result. It will not refer to variables that are on the outside.
- The initial value can simply be passed to `scan`.
- The result of `scan` is a stream of models. We can `map` on that and re-render the view every
time we have a new model value on the stream.
- Since `scan` produces the initial value on the resulting stream, we no longer have to call
`ReactDOM.render` initially (this was done at the bottom of our previous setup code). Instead, we
have the initial model on the `models` stream, and the function that we pass to `map` will get
called to render the initial view.

Here are our changes:

```js
var update = stream();
var view = createView(update);

var models = scan(function(model, value) {
  return model + value;
}, 0, update);

var element = document.getElementById("app");

models.map(function(model) {
  ReactDOM.render(view(model), element)
});
```

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
