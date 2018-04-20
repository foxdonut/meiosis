# Meiosis Tutorial

[Table of Contents](toc.html)

## 11 - Components

In the previous lesson, [10 - Deep Merge](10-deep-merge-react.html), we used plain objects to
signal updates. In our accumulator function, we deep-merged updates into the model. We also looked
at how nesting could be done at multiple levels.

Now that we have the tools to nest and reuse blocks of code, let's organize them into components.

### What is a Component?

Components mean different things in different contexts, libraries, and frameworks. Often, they have
magical properties, lifecycle methods, and so on. In Meiosis, components are just a way to organize
code. **You decide** on the structure. We'll look at one way to structure components, but remember
that ultimately, much like most everything else in Meiosis, **you are in control** and you can use
what you prefer.

### A Component with a Model and a View

Our last example had a `temperature` and a `temperaturePair`, with the latter containing two
instances of the former. Let's turn these into components with a **model** and a **view**.

Previously, we had:

```js
var createTemperature = function(update, label) {
  // ...
  var view = function(model) {
      // ...
  }
  return view;
}
```

That created the view function. Now, instead, we'll create a plain JavaScript object that returns
`{ model: ..., view: ... }` where `model` is a function that creates the initial model for the
component, and `view` is the view function:

```js
var createTemperature = function(label, init) {
  return function(update) {
    // ...
    var model = function() {
      return Object.assign({ value: 22, units: "C" }, init);
    };
    var view = function(model) {
      // ...
    };
    return { model: model, view: view };
  };
};
```

Notice that we're accepting the `label` as before to show the temperature label. Now, we also
accept an optional `init` parameter for the initial model, but if it's not provided, we default
the initial model to `{ value: 22, units: "C" }`. The `model()` function is useful to create
components that produce their initial model, so that you don't necessarily need to specify it from
the outside when creating the component.

Also realize that from `createTemperature(label, init)`, we are returning `function(update)`. This
is so that we can pass that to `nest`, in case we want to nest the component.

If we don't need parameters, we can directly return `function(update)`:

```js
var createTemperaturePair = function(update) {
  // ...
  var model = // ...
  var view = // ...
  return { model: model, view: view };
};
```

### Nesting Components

Now that we have components with a `model` and a `view`, we can decide how we nest components.
Previously, we only nested the `update` function:

```js
var nest = function(update, prop) {
  return function(obj) {
    var result = {};
    result[prop] = obj;
    update(result);
  };
};
// ...
var air = createTemperature(nest(update, "air"), "Air");
var water = createTemperature(nest(update, "water"), "Water");

return function(model) {
  return (<div>
    {air(model.air)}
    {water(model.water)}
  </div>);
};
```

In the code above, notice how we have to match `nest(update, "air")` with `air(model.air)`. That
is, we have to make sure that the property we use when calling `nest()` matches the property of
the model that we pass to the view function.

We could eliminate that requirement (and risk of error) by wrapping the `view` function so that
it automatically receives the correct property of the model. That is, after nesting the component
at `"air"`, we can just call `view(model)` and it would automatically pass `model.air` to the
view function.

At the same time, we can wrap the `model()` function so that if it returns
`{ value: 22, units: "C" }` and we nest the component with the `"air"` property, the `model()`
function automatically returns `{ air: { value: 22, units: "C" } }`.

Putting that together, we have:

```js
// Same as "nest" function that we had before
var nestUpdate = function(update, prop) {
  return function(obj) {
    var result = {};
    result[prop] = obj;
    update(result);
  };
};

// Now "nest" works on a component's "create" function
var nest = function(create, update, prop) {
  var component = create(nestUpdate(update, prop));
  var result = Object.assign({}, component);
  if (component.model) {
    result.model = function() {
      var initialModel = {};
      initialModel[prop] = component.model();
      return initialModel;
    };
  }
  if (component.view) {
    result.view = function(model) {
      return component.view(model[prop]);
    };
  }
  return result;
};
```

The `nest` function takes the component's `create` function, the property at which to nest, and
the `update` function. We create the component, passing in the nested `update`, just like we did
before.

Now, `component` is our freshly created component with a `model` function and a `view` function.
We'll create a shallow copy using `Object.assign`, and that will be our `result`. This ensures that
if you ever decide to add more properties to your component, they will be copied over.

Then, we reassign the `model` function to call the original `model` function and put the return
value inside an object with the property, such as `{ air: ... }`.

Finally, we reassign the `view` function to call the original `view` function but passing
`model[prop]`, such as `model["air"]` which is the same as `model.air`.

### Creating and using nested components

Having done this, we can create and use nested components like so:

```js
var createTemperaturePair = function(update) {
  var air = nest(createTemperature("Air"), update, "air");
  var water = nest(createTemperature("Water", { value: 84, units: "F" }),
    update, "water");

  var model = function() {
    return Object.assign(air.model(), water.model());
  };

  var view = function(model) {
    return (<div>
      {air.view(model)}
      {water.view(model)}
    </div>);
  };
  return { model: model, view: view };
};
```

Remember that `createTemperature(...)` returns `function(update)`. That is the `create` function
that we pass to `nest`, along with the `update` function and the property at which to nest.

Notice how we use the default initial model for `air`, but we can also specify a different
initial model, like we're doing for `water`.

Now, we're in turn creating a component for `temperaturePair`. Its `model` is simply the
combination of the `air` and `water` models. Here, we're benefitting from our nesting utility:
we don't have to specify the `"air"` and `"water"` properties.

We also have that benefit in the `view` function: we can just call `air.view(model)` and
`water.view(model)`, that is, just pass `model` without having to remember to call `model.air`
and `model.water`.

Finally, to demonstrate that multiple nesting still works, we can nest `temperaturePair`
at `"temperatures"`:

```js
var createApp = function(update) {
  return nest(createTemperaturePair, update, "temperatures");
};

var update = flyd.stream();
var app = createApp(update);

var models = flyd.scan(_.merge, app.model(), update);

var element = document.getElementById("app");

models.map(function(model) {
  ReactDOM.render(view(model), element);
});
```

Now, our top-level `app` is a component composed of our other components. We can get the
initial top-level model simply by calling `app.model()`, and we can render the top-level
view with `app.view(model)`.

### Putting it all together

Here is the completed example:

@flems react/11-components.jsx,app.html,app.css react,react-dom,flyd,lodash 800

### Exercise

- Add another component next to `temperatures`. Start with a component that does not accept any
parameters and creates its initial model. Then, modify the component so that it accepts an optional
initial model. What did you have to change?

When you are ready, continue on to [12 - Function Update](12-func-update-react.html).

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
