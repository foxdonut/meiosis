# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](09-using-preact.html) |
[Next >](11-whats-next.html) |
[Table of Contents](toc.html)

## 10 - Using lit-html

In the [06 - Components](06-components.html) lesson, we created the state management
code for an example with a `conditions` component and two temperature components, `air` and
`water`.

In this section, we'll wire this up to [lit-html](https://lit-html.polymer-project.org/).

<a name="wiring_meiosis"></a>
### [Wiring Meiosis](#wiring_meiosis)

Remember that we had an `actions` object and a `states` stream:

```js
var actions = app.Actions(update);
states.map(function(state) {
  document.write("<pre>" + JSON.stringify(state, null, 2) + "</pre>");
});
```

Now, we'll use lit-html's `render` and a view function to render the view. We'll use `map`
on the `states` stream, and render the view every time the state changes. We'll pass `state`
and `actions` as parameters to the `App` view function:

```js
var element = document.getElementById("app");
states.map(state => render(App(state, actions), element));
```

<a name="the_app_view_function"></a>
### [The App View Function](#the_app_view_function)

The `App` view function receives `state` and `actions` as parameters. We pass these on to other
view functions, in this case `Conditions` and `Temperature`. Notice that we have two instances
of `Temperature`, and we also pass a different `id` to each one.

```js
var App = function(state, actions) {
  return html`<div>
    ${Conditions(state, actions)}
    ${Temperature(state, "air", actions)}
    ${Temperature(state, "water", actions)}
    <pre>${JSON.stringify(state, null, 4)}</pre>
  </div>`;
};
```

<a name="the_conditions_view_function"></a>
### [The Conditions View Function](#the_conditions_view_function)

The `Conditions` view function displays a checkbox for "precipitations" and a series of radio
butons for the sky (Sunny, Cloudy, Mix of sun/clouds). The `state` is used to reflect the
current state, and `actions` are called to update the state when the user changes the
checkbox and radio buttons:

```js
var skyOption = function({ state, actions, value, label }) {
  return html`<label>
    <input type="radio" id=${value} name="sky"
      value=${value} .checked=${state.conditions.sky === value}
      @change=${evt => actions.changeSky(evt.target.value)}/>
    ${label}
  </label>`;
};

var Conditions = function(state, actions) {
  return html`<div>
    <label>
      <input
        type="checkbox"
        .checked=${state.conditions.precipitations}
        @change=${evt =>
          actions.togglePrecipitations(evt.target.checked)
        }/>
      Precipitations
    </label>
    <div>
      ${skyOption({ state, actions, value: "SUNNY",
        label: "Sunny"})}
      ${skyOption({ state, actions, value: "CLOUDY",
        label: "Cloudy"})}
      ${skyOption({ state, actions, value: "MIX",
        label: "Mix of sun/clouds"})}
    </div>
  </div>`;
};
```

<a name="the_temperature_view_function"></a>
### [The Temperature View Function](#the_temperature_view_function)

The `Temperature` view function is similar, except that it also receives an `id` and uses it to
read its state:

```js
var Temperature = function(state, id, actions) {
  return html`<div>
    ${state[id].label} Temperature:
    ${state[id].value} &deg; ${state[id].units}
    <div>
      <button
        @click=${() => actions.increment(id, 1)}>
        Increment
      </button>
      <button
        @click=${() => actions.increment(id,-1)}>
        Decrement
      </button>
    </div>
    <div>
      <button
        @click=${() => actions.changeUnits(id)}>
        Change Units
      </button>
    </div>
  </div>`;
};
```

You can see the complete example below.

@flems code/10-using-lit-html-01.js,app.html,app.css flyd,patchinko 800 shown 60

<a name="takeaways"></a>
### [Takeaways](#takeaways)

We can wire up Meiosis to lit-html using `render` and passing `state` and `actions` as
parameters to the top-level `App` view function. We call `map` on the `states` stream to
render the view whenever the state changes.

Then, all view functions in the application are consistent: they all receive `state`
and `actions` parameters. When calling other view functions, `state` and `actions` are passed
along. When a view function is used multiple times, or when you want to define the state
property outside of the view function, you also pass the `id`.

View functions can then use the `state` to render the view according to the current application
state, and call `actions` to trigger changes.

<a name="conclusion"></a>
### [Conclusion](#conclusion)

This concludes the Meiosis tutorial. See [11 - What's Next?](11-whats-next.html) for ideas on where
to go from here.

[< Previous](09-using-preact.html) |
[Next >](11-whats-next.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
