# [Meiosis](http://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## The Fundamental Meiosis Setup

We now have an understanding of [streams](01-Fundamentals-A-Quick-Intro-to-Streams.html).
In this section, we will build the fundamental Meiosis setup. As you will see, it's very simple. It's the starting
point for data flow management. After this, we can further improve the setup in various ways, but there isn't a
single "best" way because that depends on each project, developer preferences, and so on. That's the good news about
the setup: there is a foundation, but you are free to adapt it to what works best for you.

Also, know that the setup code is something you write just once for your web application. It is the top-level glue
code that wires up a reactive loop through which our data will flow, and by which our UI automatically refreshes.

### The Top-Level Model

The first thing we'll do in Meiosis is have a _single source of truth_. This is the top-level model. This model
contains the data that we need to produce our user interface, or "view".

Let's build a simple example where we have a Temperature value that we can increase by pressing a button. The model for
our example is:

```javascript
{
  value: 20
};
```

Pretty simple. Next, let's look at actions.

### Actions

Actions are given an `update` callback to signal updates to the model. The way an action signals an
update is by invoking the callback and passing it a function that gets the _current_ model and
returns the _updated_ model containing the changes.

```javascript
const createActions = update => ({
  increase: () => update(model => {
    model.value = model.value + 1;
    return model;
  })
});
```

We've created an actions object with an `increase` function that ion invokes the `update` callback and
passes it a function that increases the model's `value` by 1, and returns the updated model.

### The View

The view is created by passing the actions object. In return, we get a function of the model that
renders the view. The view will signal updates simply by calling action functions.

Here is our function that creates the view:

```javascript
const createView = actions => model => (
  <div>
    <span>Temperature: {model.value}&deg;C </span>
    <button className="btn btn-default"
      onClick={actions.increase}>Increase</button>
  </div>
);
```

I am using React in this example, but this will work just as well with a React alternative (Preact, Inferno), any
other virtual DOM library (Mithril, Snabbdom, etc.), or also other libraries such as lit-html and hyperHTML.

The view renders the temperature value with `model.value` and calls the
`increase` action when the user clicks on the button.

### The Meiosis Setup

So far, we've written _application_ code, code that defines the model and the view. In this section, we'll write _setup_
code, which is something that we only need to do once in an application. We'll set up a stream for model updates,
produce a stream of models, and render the views:

```javascript
const update = flyd.stream();
const models = flyd.scan((model, func) => func(model),
  { value: 20 }, update);

const view = createView(createActions(update));
const element = document.getElementById("app");
models.map(model => ReactDOM.render(view(model), element));
```

The code above is the fundamental Meiosis setup:

- `update` is a stream of model updates: that is, a stream of functions that get the current model and return the
updated model.
- we pass an accumulator function to `scan`. Remember that this function always gets the latest, _accumulated_
value and the _next_ value. Here, the _accumulated_ value is the model, and the _next_ value is the function that
updates the model (named `func`). To produce the resulting _accumulated_ value, we simply return the result of
calling `func(model)`. It's as simple as that.
- `models` is a stream of models, which we obtain using `scan` with our accumulator function, the initial model,
and the `update` stream.
- every time a new model is produced, we want to re-render the view. We achieve that by calling `models.map` and
passing a function that passes the model to the view function, and renders the result.

And there we have it. The Meiosis setup is to have a stream of functions that update the model, a stream of models
by `scan`ning the model updates, and a re-rendering of the view by `map`ping the stream of models and calling the
virtual DOM library's render function.

> Note that the last line of code is the only change you need to make to use a different virtual DOM library (besides
    changing the view function of course.) For example, with Mithril you would use `models.map(model => m.render(element, view(model, update)));`

Now, you will see the Temperature initially at 20, and go up by 1 every time you press the `Increase` button.

You can see the full code example and experiment with it below:

@flems code/01-Fundamentals/B-Meiosis-Setup/index.jsx,app.html,app.css react,react-dom,flyd 700

### Principles / Takeaways

You've seen a simple example of the Meiosis setup. Here are some takeaway principles:

- There is just one source stream: `update`. However, none of the application code is _aware_ of streams at all;
views just call actions, and actions call `update` as a regular function.
- The `models` stream results from a simple `scan`, and the re-rendering of the view is achieved with `map`. The use
of streams is _simple_ and _minimal_. We do not need to use stream operators anywhere else in the code.
- Views are just functions of `(model)`.
- The only dependencies are a virtual DOM library of your choice, and a stream library of your choice - or, write
your own, as demonstrated [in the Meiosis tutorial](http://meiosis.js.org/tutorial/05-stream-mithril.html).
- Meiosis is just a pattern setup. There is no dependency on a Meiosis library.

### Up Next

Next, we'll look at structuring code into [components](01-Fundamentals-C-Components.html).

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
