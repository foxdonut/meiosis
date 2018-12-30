# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](05-meiosis-with-patchinko.html) |
[Next >](07-using-mithril.html) |
[Table of Contents](toc.html)

## 06 - Components

### Building Components

Let's continue our previous example. We already had a "temperature" component. We'll add a
"conditions" component for the current conditions (sunny, cloudy, rain) so that our initial
state is now:

```js
{
  conditions: {
    precipitations: false,
    sky: "Sunny"
  },
  temperature: {
    value: 22,
    units: "C"
  }
}
```

Each component will separately indicate its initial state and the actions that it provides.
At the top-level app, we'll assemble these together into the complete initial state and set
of actions.

For the conditions, we have:

```js
var conditions = {
  initialState: {
    conditions: {
      precipitations: false,
      sky: "Sunny"
    }
  },
  actions: function(update) {
    return {
      togglePrecipitations: function(value) {
        update({ conditions: PS({ precipitations: value }) });
      },
      changeSky: function(value) {
        update({ conditions: PS({ sky: value }) });
      }
    };
  }
};
```

For the temperature, we have essentially the same code as we previously had.

```js
var temperature = {
  initialState: {
    temperature: {
      value: 22,
      units: "C"
    }
  },
  actions: function(update) {
    return {
      increment: function(amount) {
        update({ temperature: PS({ value: S(x => x + amount) }) });
      },
      changeUnits: function() {
        update({
          temperature: S(state => {
            var value = state.value;
            var newUnits = state.units === "C" ? "F" : "C";
            var newValue = convert(value, newUnits);
            state.value = newValue;
            state.units = newUnits;
            return state;
          })
        });
      }
    };
  }
};
```

Then, to assemble the components into the top-level app, we put together the state management
code by combining the initial state and the actions of the components.

```js
var app = {
  initialState: Object.assign({},
    conditions.initialState,
    temperature.initialState
  ),
  actions: function(update) {
    return Object.assign({},
      conditions.actions(update),
      temperature.actions(update)
    );
  }
};
```

Here is the complete example:

@flems code/06-components-01.js flyd,patchinko 800

In this example, components designate a property for their state (`conditions`, `temperature`).
What if we want to designate a property from outside the component, to make sure there are no
conflicts? Even more significantly, what if we want to have multiple instances of a component?

### Using IDs for Components

Whether it's to manage properties from outside of components, or to use multiple instances of
a component, we can use IDs and pass them to components. Then, instead of having a hardcoded
property in the component, the ID is used when reading and updating state.

Continuing the previous example, let's say we want to have two instances of the `temperature`
component: one for the air temperature and one for the water temperature. We want to use the
`air` and `water` properties in the application state.

First, we'll change `initialState` to a function so that we get a separate instance for
each temperature component:

```js
var temperature = {
  initialState: function() {
    return {
      value: 22,
      units: "C"
    };
  },
  // ...
};
```

Next, we'll change the actions to accept an `id` parameter. Then, we use the `id` when issuing
updates, so that we dyamically update the `id` property of the state:

```js
actions: function(update) {
  return {
    increment: function(id, amount) {
      update({ [id]: PS({ value: S(x => x + amount) }) });
    },
    changeUnits: function(id) {
      update({
        [id]: S(state => {
          var value = state.value;
          var newUnits = state.units === "C" ? "F" : "C";
          var newValue = convert(value, newUnits);
          state.value = newValue;
          state.units = newUnits;
          return state;
        })
      });
    }
  };
}
```

Notice the `{ [id]: ... }` syntax which creates an object with a dynamic `id` property.

Finally, we create the initial state with two instances of `temperature`, one with `air`
and one with `water`. The `actions` are created the same as before. Indeed, we just need
one instance of the temperature actions; it's the `id` that we pass to the actions that
indicates which instance to act upon.

```js
var app = {
  initialState: Object.assign({},
    conditions.initialState,
    { air: temperature.initialState() },
    { water: temperature.initialState() }
  ),
  actions: function(update) {
    return Object.assign({},
      conditions.actions(update),
      temperature.actions(update)
    );
  }
};
```

Here is the complete example:

@flems code/06-components-02.js flyd,patchinko 800

### Exercises

Try it out: notice that the initial state appears in the output on the right. Within the console,
type and then press Enter:

`actions.changeSky("Cloudy")`

`actions.increment("air", 2)`

`actions.changeUnits("water")`

In the output on the right, you'll see the updated states.

### State Management and View code

So far, all we have is state management code; there is no view code. This is on purpose:
we've built our state management code independently. We can trigger actions and see the
updated state. Our code is not tied to any particular view code.

The view code is a separate concern. It will display the UI based on the state, and call
actions.

How you group together the code is up to you. In some cases, it might make sense to put state
management and view code together into a folder for a component of your application. In other
cases, you may prefer to have view components separate from the code that manages state.

In the following sections, we will look at wiring up the Meiosis pattern to a handful of
view libraries. Feel free to jump straight to the view library in which you are interested.

- [07 - Using Mithril](07-using-mithril.html)
- [08 - Using React](08-using-react.html)
- [09 - Using Preact](09-using-preact.html)
- [10 - Using lit-html](10-using-lit-html.html)

[< Previous](05-meiosis-with-patchinko.html) |
[Next >](07-using-mithril.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
