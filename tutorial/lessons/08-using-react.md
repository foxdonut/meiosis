# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](07-using-mithril.html) |
[Next >](09-using-preact.html) |
[Table of Contents](toc.html)

## 08 - Using React

In the [06 - Components](06-components.html) lesson, we created the state management
code for an example with a `conditions` component and two temperature components, `air` and
`water`.

In this section, we'll wire this up to [React](https://reactjs.org/).

<a name="wiring_meiosis"></a>
### [Wiring Meiosis](#wiring_meiosis)

Remember that we had an `actions` object and a `states` stream:

```js
var actions = app.Actions(update);
states.map(function(state) {
  document.write("<pre>" + JSON.stringify(state, null, 2) + "</pre>");
});
```

Now, we'll use `ReactDOM.render` and a React component to render the view. We'll pass the
`actions` and `states` props to a top-level `App` component:

```js
ReactDOM.render(<App states={states} actions={actions} />,
  document.getElementById("app"));
```

Within the `App` component, we'll use `map` on the `states` stream and call `setState` so
that the view gets refreshed whenever the state changes.

<a name="the_app_component"></a>
### [The App Component](#the_app_component)

The `App` component retrieves `states` and `actions` from the passed-in props. We initialize a React
hook with `useState` from the first value of the `states` stream. Then, we `map` the `states` stream
and call `setState` to set the hook state.

```js
var App = function({ states, actions }) {
  var [init, setInit] = React.useState(false);
  var [state, setState] = React.useState(states());

  if (!init) {
    setInit(true);
    states.map(setState);
  }

  return (<div>
    <Conditions state={state} id="conditions" actions={actions} />
    <Temperature state={state} id="temperature:air" actions={actions} />
    <Temperature state={state} id="temperature:water" actions={actions} />
    <pre>{JSON.stringify(state, null, 4)}</pre>
  </div>);
}
```

<a name="the_conditions_component"></a>
### [The Conditions Component](#the_conditions_component)

The `Conditions` component displays a checkbox for "precipitations" and a series of radio
butons for the sky (Sunny, Cloudy, Mix of sun/clouds). The `state` is used to reflect the
current state, and `actions` are called to update the state when the user changes the
checkbox and radio buttons:

```js
var SkyOption = function({ state, id, actions, value, label }) {
  return (<label>
    <input type="radio" id={value} name="sky"
      value={value} checked={state[id].sky === value}
      onChange={evt => actions.changeSky(id, evt.target.value)}/>
    {label}
  </label>);
};

var Conditions = function({ state, id, actions }) {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={state[id].precipitations}
          onChange={evt =>
            actions.togglePrecipitations(id, evt.target.checked)
          }/>
        Precipitations
      </label>
      <div>
        <SkyOption state={state} id={id} actions={actions} value="SUNNY"
          label="Sunny"/>
        <SkyOption state={state} id={id} actions={actions} value="CLOUDY"
          label="Cloudy"/>
        <SkyOption state={state} id={id} actions={actions} value="MIX"
          label="Mix of sun/clouds"/>
      </div>
    </div>
  );
};
```

<a name="the_temperature_component"></a>
### [The Temperature Component](#the_temperature_component)

The `Temperature` component is similar:

```js
var Temperature = function({ state, id, actions }) {
  return (<div>
    {state[id].label} Temperature:
    {state[id].value} &deg; {state[id].units}
    <div>
      <button
        onClick={() => actions.increment(id, 1)}>
        Increment
      </button>
      <button
        onClick={() => actions.increment(id,-1)}>
        Decrement
      </button>
    </div>
    <div>
      <button
        onClick={() => actions.changeUnits(id)}>
        Change Units
      </button>
    </div>
  </div>);
};
```

You can see the complete example below.

@flems code/08-using-react-01.jsx,app.html,app.css flyd,react,react-dom,mergerino 800 shown 60

<a name="takeaways"></a>
### [Takeaways](#takeaways)

We can wire up Meiosis to React with a hook. We `map` the `states` stream to call `setState` to
update the state and automatically refresh the view.

Then, all other React components in the application are consistent: they all receive `state`
and `actions` props. When rendering other components, `state` and `actions` are passed along.
When a component is used multiple times, or when you want to define the state property outside of
the component, you also pass the `id`.

Components can then use the `state` to render the view according to the current application
state, and call `actions` to trigger changes.

<a name="conclusion"></a>
### [Conclusion](#conclusion)

This concludes the Meiosis tutorial. See [11 - What's Next?](11-whats-next.html) for ideas on where
to go from here.

[< Previous](07-using-mithril.html) |
[Next >](09-using-preact.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
