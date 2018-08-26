# [Meiosis](http://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Computed Properties

In this section, we'll look at adding computed properties to our model.

### Preparing Data for the View

_Computed properties_ are properties that are the result of some calculation bassed on other
values of the model. We'd like to have those properties made available to the view, but we
want to keep the computation logic out of the view code.

Here is an example:

```javascript
export const createTemperature = update => {
  const computed = model => {
    let temp = model.value;

    if (model.units === "F") {
      temp = Math.round((temp - 32) * 5 / 9);
    }
    model.comment = (temp < 10) ? "COLD!" : (temp > 40) ? "HOT" : "";

    return model;
  };
};
```

In our temperature component model, we've added a `comment` property. When the temperature
is less than 10 degrees Celsius, the comment will say `COLD!`. Over 40 degrees Celsius, it
will say `HOT`. In between, the comment will be blank. If the temperature is in Farenheit,
we'll first convert the temperature to Celsius.

### Wrapping the View function

To use the `computed` function, we'll wrap our view so that the model goes through `computed`
before being passed on to the view:

```javascript
  const view = createView(createActions(update));

  return {
    model: () => ({
      date: "",
      value: 20,
      units: "C"
    }),

    view: model => view(computed(model))
  };
}
```

Now, we can simply display the comment in the view:

```html
<span>Temperature: {model.value}&deg;{model.units} {model.comment}</span>
```

The view is free from computed property logic, and component instances remain independent of
one another.

@flems code/02-Reusable-Components/B-Computed-Properties/nest.js,code/02-Reusable-Components/B-Computed-Properties/temperature.jsx,code/02-Reusable-Components/B-Computed-Properties/app.jsx,code/02-Reusable-Components/B-Computed-Properties/index.js,app.html,app.css react,react-dom,flyd 800

### Principles / Takeaways

- Computed properties are convenient to prepare data for the view.
- We can use computed properties simply by wrapping the view function.

### Up Next

This completes the part of Meiosis covering components. In the next part, we'll look at alternative
strategies for nesting models: [Lodash FP](03-Model-and-Nesting-A-Lodash-FP.html),
[Ramda](03-Model-and-Nesting-B-Ramda.html), and
[Patchinko](03-Model-and-Nesting-C-Patchinko.html).

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
