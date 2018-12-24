# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](06-meiosis-with-patchinko.html) |
[Next >](08-using-mithril.html) |
[Table of Contents](toc.html)

## 07 - Components

We'll change the counter to a temperature example with a state shaped as follows:

```js
{
  value: 22,
  units: "C"
}
```

Previously, we were emitting patches onto the `update` stream in the form of numbers that
represented the amount by which to increment the counter. Now, our patches will instead be
Patchinko patches, giving us a much more powerful way to update the state and giving us a
general-purpose approach.

To increment the temperature value, we can use a patch as follows:

```js
increment: function(amount) {
  update({ value: S(current => current + amount) });
}
```

We can also convert the temperature between Celsius and Farenheit:

```js
var convert = function(value, to) {
  return Math.round(
    (to === "C") ? ((value - 32) / 9 * 5) : (value * 9 / 5 + 32)
  );
};

changeUnits: function(state) {
  var newUnits = state.units === "C" ? "F" : "C";
  var newValue = convert(state.value, newUnits);
  update({ value: newValue, units: newUnits });
}
```

So now `update` is a stream of Patchinko patches. To handle them in the accumulator function
and produce a stream of updated states, we can use `P`:

```js
var states = m.stream.scan(function(state, patch) {
  return P(state, patch);
}, app.initialState, update);
```

### Passing functions as parameters

But wait! Notice the accumulator function we are passing as a parameter to `scan`:

```js
m.stream.scan(function(state, patch) {
  return P(state, patch);
}, app.initialState, update);
```

We have a function that takes `(state, patch)` as calls `P` with `(state, patch)`. The `P`
function already does what we want, so we can pass it directly to `scan`:

```js
m.stream.scan(P, app.initialState, update);
```

Whenever you are passing a function that looks like:

```js
callSomething(
  function(params) {
    return someFunction(params);
  }
);
```

You are creating a function that takes some parameters and calls a function with the same
parameters. There is no need to create that outer function - instead, you can just pass
`someFunction` directly:

```js
callSomething(someFunction);
```

Passing functions as parameters is very useful!

Putting it all together, we have the example shown below.

@flems mithril/06-components-01.js,app.html,app.css patchinko,mithril,mithril-stream 800

### Building Components

When building components with the Meiosis pattern, we split code into two separate concerns:

- **State management** code - initial state, actions that update the state
- **View** code - view components that display the UI based on the state, and call actions.

How you group together the code is up to you. In some cases, it might make sense to put state
management and view code together into a folder for a component of your application. In other
cases, you may prefer to have view components separate from the code that manages state.

Let's change our previous example to move the code into a "temperature" component. We'll also
add a "conditions" component for the current conditions (sunny, cloudy, rain):

```js
{
  conditions: "Sunny",
  temperature: {
    value: 22,
    units: "C"
  }
}
```

Each component will have a state management part to indicate its initial state and the actions
that it provides. We'll indicate this with a lowercase: `conditions` and `temperature`. Each
component will also have a Mithril view component, which we'll designate with an uppercase:
`Conditions` and `Temperature`.

For the conditions, we have:

```js
// State management
var conditions = {
  initialState: "Sunny",
  actions: function(update) {
    return {
      setConditions: function(conditions) {
        update({ conditions: conditions });
      }
    };
  }
};

// Mithril view
var Conditions = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div.temperature", [
      ["Sunny", "Cloudy", "Rain"].map(key =>
        m("label", [
          m("input", { type: "radio", name: "conditions", value: key,
            checked: state.conditions === key,
            onchange: () => actions.setConditions(key)
          }),
          key, " "
        ])
      )
    ]);
  }
};
```

For the temperature, we have essentially the same code as we previously had as `app` and `App`,
but as `temperature` and `Temperature`.

```js
var temperature = {
  initialState: {
    value: 22,
    units: "C"
  },
  actions: function(update) {
    return {
      increment: function(amount) {
        update({ temperature: PS({ value: S(current => current + amount) }) });
      },
      changeUnits: function(state) {
        var newUnits = state.temperature.units === "C" ? "F" : "C";
        var newValue = convert(state.temperature.value, newUnits);
        update({ temperature: PS({ value: newValue, units: newUnits }) });
      }
    };
  }
};

var Temperature = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    var myState = state.temperature;
    return m("div.temperature", [
      "Temperature: ", myState.value, m.trust("&deg;"), myState.units,
      m("div",
        m("button", { onclick: () => actions.increment( 1) }, "Increment"),
        m("button", { onclick: () => actions.increment(-1) }, "Decrement")
      ),
      m("div",
        m("button", { onclick: () => actions.changeUnits(state) }, "Change Units")
      )
    ]);
  }
};
```

Then, to assemble the components into the top-level app, we put together the state management
code by combining the initial state and the actions of the components. The top-level view
simply renders the components as regular Mithril components, passing `state` and `actions`
to them.

```js
var app = {
  initialState: {
    conditions: conditions.initialState,
    temperature: temperature.initialState,
  },
  actions: function(update) {
    return Object.assign({},
      conditions.actions(update),
      temperature.actions(update)
    );
  }
};

var App = {
  view: function(vnode) {
    var { state, actions } = vnode.attrs;
    return m("div", [
      m(Conditions, { state, actions }),
      m(Temperature, { state, actions })
    ]);
  }
};
```

Here is the complete example:

@flems mithril/06-components-02.js,app.html,app.css patchinko,mithril,mithril-stream 800

-----

@flems mithril/06-components-03.js,app.html,app.css patchinko,mithril,mithril-stream 800

[< Previous](06-meiosis-with-patchinko.html) |
[Next >](08-using-mithril.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
