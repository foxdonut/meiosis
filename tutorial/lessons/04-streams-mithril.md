# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 04 - Streams

In the previous lesson, [03 - Update State](03-update-state-mithril.html), we used
**functions that return functions** to extract the `update` logic out of the view, and also to
create an event handler function that accepts a parameter.

Our Meiosis pattern setup code was as follows:

```js
var model = 0;
var element = document.getElementById("app");
var view = null;

var update = function(value) {
  model = model + value;
  m.render(element, view(model));
};

view = createView(update);
m.render(element, view(model));
```

Our initial model is `0`. When the view issues an update, such as `update(1)`, we add the value
`1` to the model and re-render the view.

That works, but what's not so great about this setup is that we have a circular dependency:

- To create the `view` function, we need to pass `update` to `createView`.
- To create the `update` function, we need the `view` function so that `update` can re-render
the view.

So `view` needs `update` and `update` needs `view`... We solved this problem by initializing
`view` to `null`. Then we created the `update` function, which uses `view` but we know it won't
get called until we have a chance to create the `view` function. This is okay as a workaround but
it's not a great situation.

### The Meiosis Pattern: A Reactive Loop

What we've set up with the Meiosis Pattern is a **reactive loop**:

![The Reactive Loop](04-streams-mithril-01.svg)

- We start with a `model`
- The `view` is a function of the model that produces a `vnode`
- We `render` the `vnode` to the `element`
- When an event occurs, such as `onclick`, we issue an `update`, passing it a value
- The `update` uses the value to update the `model`
- We call the `view` with the updated `model`
- We `render` the `vnode` to the `element`
- And the loop continues.

The key here is the `update` function: it receives values from the `view`, updates the model, and
re-renders the view. So, how do we solve the circular dependency between `update` and `view`?

### Introducing Streams

What we'd like to do is have `update` as a way for the view to send values out so that we can use
them to update the model and re-render the view. But, we want `update` to **only** be a way to
communicate values. **What** we do with those values (update the model, re-render the view) should
be separate from `update`. This will solve our circular dependency problem.

One nice and simple way to **communicate values** is to use a **stream**. If you already know what
a stream is and are comfortable with them, great. But, if you have glanced at streams elsewhere and
found them overly complicated, **please forget all of that** because the streams that we use here
are very simple. In fact, to demystify them and make sure that you clearly understand how they
work, we will start by writing a bare-bones yet sufficient implementation in just a handful of
lines of code.

A stream is a **sequence of values**, similar to an array. Over time, you can send values onto
a stream. You can also have functions that get called every time a value arrives on the stream.
As you have probably figured out, we want `update` to be a stream.

When we call `update(1)`, `update(-1)`, and so on from the view, these values will be in a stream:

![Stream](04-streams-02.svg)

The way to **do** something with the values that arrive on the stream is by calling `.map()`. We
**pass a function as a parameter** to `.map()`, and that function gets called every time a new
value arrives onto the stream. The **result** of calling `.map()` is a **new stream** with the
**values returned by the function**.

![Map Stream](04-streams-03.svg)

In our case, what we want to do with the values that arrive onto the `update` stream is to
update the model and re-render the view:

```js
var model = 0;
var update = stream();
var view = createView(update);

var element = document.getElementById("app");

update.map(function(value) {
  model = model + value;
  m.render(element, view(model));
});
```

Although `map` produces a new stream, we don't need it here. The function that we pass does not
return anything that we need to use. As you can see, `map` allows us not only to produce a new
stream of values, but also to **do** something with the values (also known as **side effects**).

As you can see, we have now successfully separated out `update` as a way for the view to send
values, from **what to do with those values**. We no longer have a circular dependency between
`update` and `view`!

### A simple stream implementation

As promised, we'll now write a simple implementation `stream` and `map`. Feel free to skip this
section if you'd rather skip over the internals, and please know that later on we'll use a
simple stream library that provides what we need. However, if you prefer to have an idea of
what's going on within `stream`, or if you prefer **not** to have an additional dependency in
your project, read on, as our bare-bones implementation is perfectly suitable to use in the
Meiosis pattern.

There are two parts to a stream that we get when calling `var update = stream()`:

1. Calling it as a function, `update(value)`, pushes the value onto the stream.
1. Calling `update.map(someFunction)` creates a new stream. For every `value` that arrives
onto the `update` stream, call `someFunction(value)` and push the result onto the new stream.

Here is our stream implementation:

@flems common/05-stream-impl.js [] 550

We start with an empty array of `mapFunctions`. These are the functions passed in with `.map`.
When the stream is called as a function, we go through every `mapFunction` and call them with
the value.

For `.map`, we create a new stream. We add a function to the current stream which will call
the passed-in function and push the result onto the new stream.

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

### Putting it all together

Now that we have our stream implementation, we can use it in our counter example:

@flems mithril/05-stream.js,app.html,app.css mithril 800

Our application code did not need to change - it still calls the `update` function as before - but
we now use a stream for `update`, which enables us to separate out the function that determines
what to do with the incoming values.

### Exercises

The function that we pass to `update.map` does three things:

- Updates the model
- Calls `view` to produce a `vnode`
- Renders the `vnode` with `m.render`.

Now,

1. Separate out the first and the third task into separate functions: `updateModel` and `render`.
1. Since `.map` returns a stream, you can chain calls to `.map`, so that each function gets the
result of calling the previous function. Using this and the functions that you separated out,
change the `update.map` block to:

```js
update
  .map(updateModel)
  .map(view)
  .map(render);
```

Verify that the example still works properly. Hint: make sure to return the model from the
`updateModel` function.

Whether to use a single function, or to separate out the steps into individual functions, is up
to your personal preference.

### Solution

@flems mithril/05-stream-solution.js,app.html,app.css mithril 800 hidden




### Scan

Recall that our Meiosis pattern setup code was:

```js
var model = 0;
var update = stream();
var view = createView(update);

var element = document.getElementById("app");

update.map(function(value) {
  model = model + value;
  m.render(element, view(model));
});

m.render(element, view(model));
```

- We have an **initial model** of 0.
- We render the view with that initial model (on the last line).
- When an update comes in, our function gets called to:
  - Update the model, and
  - Re-render the view.

Notice that when we update the model, `model = model + value`, we are **combining** the incoming
value with the current model (here, by addition), and the result becomes the current model for
next time. Let's call this an **accumulator**.

### Introducing `scan`

It turns out that streams have, besides `map`, another method called `scan`. In fact, stream
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

### Implementing `scan`

To implement `scan`, first we'll improve our `stream` by adding a feature: optionally passing
in an initial value for the stream:

```js
var stream = function(initial) {
  var mapFunctions = [];
  var createdStream = function(value) {
    for (var i in mapFunctions) {
      mapFunctions[i](value);
    }
  };
  createdStream.map = function(mapFunction) {
    var newInitial = undefined;
    if (initial !== undefined) {
      newInitial = mapFunction(initial);
    }
    var newStream = stream(newInitial);

    mapFunctions.push(function(value) {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
};
```

We've added the `initial` parameter. Then, when `map` is called, we check whether there was an
initial value for the source stream. If there was, then the initial value for the new stream
is the result of calling the passed in `mapFunction`.

Now that we can specify an initial value for a stream, we can implement `scan`:

```js
var scan = function(accumulator, initial, sourceStream) {
  var newStream = stream(initial);
  var accumulated = initial;

  sourceStream.map(function(value) {
    accumulated = accumulator(accumulated, value);
    newStream(accumulated);
  });

  return newStream;
};
```

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
  m.render(element, view(model));
});

m.render(element, view(model));
```

We can make these improvements:

- No longer have a `model` variable that we keep reassigning. Instead, our accumulator function
can be cleaner and more self-contained: it can receive the latest model and the next value, and
return the result. It will not refer to variables that are on the outside.
- The initial value can simply be passed to `scan`.
- The result of `scan` is a stream of models. We can `map` on that and re-render the view every
time we have a new model value on the stream.
- Since `scan` produces the initial value on the resulting stream, we no longer have to call
`m.render` initially (this was done at the bottom of our previous setup code). Instead, we have
the initial model on the `models` stream, and the function that we pass to `map` will get
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
  m.render(element, view(model));
});
```

You can try out the complete example below.

@flems mithril/06-scan.js,app.html,app.css mithril 800

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

@flems mithril/06-scan-solution.js,app.html,app.css mithril 800 hidden

When you are ready, continue on to [06 - Scan](06-scan-mithril.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
