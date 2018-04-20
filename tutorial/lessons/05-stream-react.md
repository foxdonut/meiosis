# Meiosis Tutorial

[Table of Contents](toc.html)

## 05 - Stream

In the previous lesson, [04 - Update Function](04-update-function-react.html), we used
**functions that return functions** to extract the `update` logic out of the view, and also to
create an event handler function that accepts a parameter.

Our Meiosis pattern setup code was as follows:

```js
var model = 0;
var element = document.getElementById("app");
var view = null;

var update = function(value) {
  model = model + value;
  ReactDOM.render(view(model), element);
};

view = createView(update);
ReactDOM.render(view(model), element);
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

![The Reactive Loop](05-stream-04.svg)

- We start with a `model`
- The `view` is a function of the model that produces a `vnode`
- We `render` the `vnode` to the `element`
- When an event occurs, such as `onclick`, we issue an `update`, passing it a value
- The `update` uses the value to update the `model`
- We call the `view` with the updated `model`
- We `render` the `vnode` to the `element`
- And the loop continues.

The key here is the `update` function: it receives values from the `view`, updates the model, and
re-renders the view. So, how to we solve the circular dependency between `update` and `view`?

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

![Stream](05-stream-02.svg)

The way to **do** something with the values that arrive on the stream is by calling `.map()`. We
**pass a function as a parameter** to `.map()`, and that function gets called every time a new
value arrives onto the stream. The **result** of calling `.map()` is a **new stream** with the
**values returned by the function**.

![Map Stream](05-stream-03.svg)

In our case, what we want to do with the values that arrive onto the `update` stream is to
update the model and re-render the view:

```js
var model = 0;
var update = stream();
var view = createView(update);

var element = document.getElementById("app");

update.map(function(value) {
  model = model + value;
  ReactDOM.render(view(model), element);
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

## Exercises

Using the code above, take our stream implementation out for a test drive.

1. Create an `update` stream.
1. Create a `timesTen` stream that is the result of multiplying by ten each value from the
`update` stream.
1. Create a `plusTwo` stream that is the result of adding two to each value from the
`timesTen` stream.
1. Map a function to the `plusTwo` stream that outputs each value using `console.log`.
1. Verify that everything is working by calling `update(1)` and `update(2)` and seeing
`12` and `22` on the console log.

### Putting it all together

Now that we have our stream implementation, we can use it in our counter example:

@flems react/05-stream.jsx,app.html,app.css react,react-dom 800

Our application code did not need to change - it still calls the `update` function as before - but
we now use a stream for `update`, which enables us to separate out the function that determines
what to do with the incoming values.

### Exercises

The function that we pass to `update.map` does three things:

- Updates the model
- Calls `view` to produce a `vnode`
- Renders the `vnode` with `ReactDOM.render`.

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

When you are ready, continue on to [06 - Scan](06-scan-react.html).

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
