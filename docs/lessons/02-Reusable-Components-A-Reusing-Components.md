# [Meiosis](http://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Reusing Components

Now that we have components, let's look at how we can make components
reusable by having multiple instances within the same top-level model.

### Multiple Component Instances

Let's say we'd like to reuse the temperature component from our
[previous example](01-Fundamentals-C-Components.html) twice
on the same page: once for air and once for water temperature. We'd like each component to keep
managing its own model, but at the same time we want a single top-level model.

Here is our app which contains two instances of the temperature component:

```javascript
export const createApp = update => {
  const air = nest(createTemperature, update, "air");
  const water = nest(createTemperature, update, "water");

  return {
    model: () => Object.assign(air.model(), water.model()),
    view: createView({air, water})
  };
};
```

We've created two instances of the temperature component. However, we did not pass the `update` function
directly to `createTemperature`; instead, we called a `nest` function, passing `createTemperature`,
the `update` function, and the path for each component.

Also notice that our app's initial model has each component's model within the top-level, one for
`air` and one at `water`.

Finally, we pass our components to the view so that it can render them.

### Nesting Updates

The question is, what is `nest` and how do we write this function so that we nest components with a path?

That is the beauty of the Meiosis pattern: because we are passing _functions_ to `update`, and because
these are functions that get the latest model and return the updated model, it's straightforward to
write a `nestUpdate` function:

```javascript
const nestUpdate = (update, path) => func =>
  update(model => {
    model[path] = func(model[path]);
    return model;
  });
```

What `nestUpdate` does is return a function that wraps `update`. It takes the incoming `func`
and calls the original `update` by passing `model[path]` to `func` and assigning the result
back to `model[path]`.

For example, if the incoming `func` is the function that increases the `value` of the
temperature:

```javascript
const func = model => {
  model.value = model.value + amount;
  return model;
};
```

Then `nestUpdate(update, "air")` will nest the update at the `"air"` property of the top-level model:

```javascript
update(model => {
  model["air"] = func(model["air"]);
  return model;
});
```

We are ready to nest components.

### Nesting Components

Now that we have `nestUpdate`, we can write the `nest` function to nest components:

```js
export const nest = (create, update, path) => {
  const component = create(nestUpdate(update, path));
  const result = Object.assign({}, component);
  if (component.model) {
    result.model = () => ({ [path]: component.model() });
  }
  if (component.view) {
    result.view = model => component.view(model[path]);
  }
  return result;
};
```

We passed the component's `create` function to `nest`, and we call it to create the component,
passing in the nested `update`. Now that we've created the component, we can wrap its `model`
and `view` functions:

- for `model`, we return an object with the `path` as the key and the model as the value,
effectively nesting the model with `path`
- for `view`, we simply pass `model[path]` to the `view` function. This lets us call `view(model)`
for nested components instead of having to keep track of which nested model to pass to each
component (such as `air.view(model.air)` and `water.view(model.water)`).

We are ready to render the components in the view.

### The View

Having created our components containing temperature instances for air and water, we can pass them
to the view and render them:

```javascript
export const createView = components => model => (
  <div>
    <h4>App</h4>
    {components.air.view(model)}
    {components.water.view(model)}
  </div>
);
```

Notice that when calling `view()`, we pass `model` to each instance. The `nest` function took care
of wrapping `view()` to pass in the nested model.

@flems code/02-Reusable-Components/A-Reusing-Components/nest.js,code/02-Reusable-Components/A-Reusing-Components/temperature.jsx,code/02-Reusable-Components/A-Reusing-Components/app.jsx,code/02-Reusable-Components/A-Reusing-Components/index.js,app.html,app.css react,react-dom,flyd 800

### Principles / Takeaways

- Reusing components is simply a matter of nesting instances at different paths within the
top-level model.
- We did not need to change the original component. Components can continue to work with just their
own model, without being aware of where they are nested.
- Our top-level model is still the single source of truth.

### Up Next

In the next article, we will look at [Computed Properties](02-Reusable-Components-B-Computed-Properties.html).

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
