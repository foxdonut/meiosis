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

@flems code/06-components-02.js flyd,patchinko 800

When building components with the Meiosis pattern, we split code into two separate concerns:

- **State management** code - initial state, actions that update the state
- **View** code - view components that display the UI based on the state, and call actions.

How you group together the code is up to you. In some cases, it might make sense to put state
management and view code together into a folder for a component of your application. In other
cases, you may prefer to have view components separate from the code that manages state.

- [07 - Using Mithril](07-using-mithril.html)
- [08 - Using React](08-using-react.html)
- [09 - Using Preact](09-using-preact.html)
- [10 - Using lit-html](10-using-lit-html.html)

[< Previous](05-meiosis-with-patchinko.html) |
[Next >](07-using-mithril.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
