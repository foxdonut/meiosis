# [Meiosis](https://meiosis.js.org) Tutorial

[< Previous](08-using-react.html) |
[Next >](10-using-lit-html.html) |
[Table of Contents](toc.html)

## 09 - Using Preact

In the [06 - Components](06-components.html) lesson, we created the state management
code for an example with a `conditions` component and two temperature components, `air` and
`water`.

In this section, we'll wire this up to [Preact](https://preactjs.com/).

<a name="wiring_meiosis"></a>
### [Wiring Meiosis](#wiring_meiosis)

Remember that we had an `actions` object and a `states` stream:

```js
var actions = app.Actions(update);
states.map(function(state) {
  document.write("<pre>" + JSON.stringify(state, null, 2) + "</pre>");
});
```

Now, we'll use `preact.render` and a Preact component to render the view. We'll pass the
`actions` and `states` props to a top-level `App` component:

```js
preact.render(<App states={states} actions={actions} />,
  document.getElementById("app"));
```

Within the `App` component, we'll use `map` on the `states` stream and call `setState` so
that the view gets refreshed whenever the state changes.

<a name="the_app_component"></a>
### [The App Component](#the_app_component)

The `App` component retrieves `states` and `actions` from the passed-in props. In the
`componentWillMount` lifecycle method, we `map` the `states` stream and call `setState` so
that the view gets re-rendered when the state is updated. Because the `states` stream
already has an initial value, this also sets the Preact state before the first call to the
`render` method.

In the `render` method, we retrieve the state from `this.state`, and the `actions` from the
props. We pass these on to other components, in this case `Conditions` and `Temperature`,
as props. Notice that we have two instances of `Temperature`, and we pass a different `id`
to each one.

```js
class App extends preact.Component {
  componentWillMount() {
    var setState = this.setState.bind(this);
    this.props.states.map(function(state) {
      setState(state);
    });
  }
  render() {
    var state = this.state;
    var { actions } = this.props;
    return (<div>
      <Conditions state={state} id="conditions" actions={actions} />
      <Temperature state={state} id="temperature:air" actions={actions} />
      <Temperature state={state} id="temperature:water" actions={actions} />
      <pre>{JSON.stringify(state, null, 4)}</pre>
    </div>);
  }
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

class Conditions extends preact.Component {
  render() {
    var { state, id, actions } = this.props;
    return (<div>
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
        <SkyOption state={state} actions={actions} value="SUNNY"
          label="Sunny"/>
        <SkyOption state={state} actions={actions} value="CLOUDY"
          label="Cloudy"/>
        <SkyOption state={state} actions={actions} value="MIX"
          label="Mix of sun/clouds"/>
      </div>
    </div>);
  }
}
```

<a name="the_temperature_component"></a>
### [The Temperature Component](#the_temperature_component)

The `Temperature` component is similar:

```js
class Temperature extends preact.Component {
  render() {
    var { state, id, actions } = this.props;
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
  }
}
```

You can see the complete example below.

@flems code/09-using-preact-01.jsx,app.html,app.css flyd,preact,mergerino 800 shown 60

<a name="takeaways"></a>
### [Takeaways](#takeaways)

We can wire up Meiosis to Preact using `preact.render` and passing `states` and `actions` as
props to the top-level `App` Preact component. In the `componentWillMount` lifecycle method,
this component calls `map` on the `states` stream to call `setState` for the initial state and
also when the state changes, automatically refreshing the view.

Then, all other Preact components in the application are consistent: they all receive `state`
and `actions` props. When rendering other components, `state` and `actions` are passed along.
When a component is used multiple times, or when you want to define the state property outside of
the component, you also pass the `id`.

Components can then use the `state` to render the view according to the current application
state, and call `actions` to trigger changes.

<a name="conclusion"></a>
### [Conclusion](#conclusion)

This concludes the Meiosis tutorial. See [11 - What's Next?](11-whats-next.html) for ideas on where
to go from here.

[< Previous](08-using-react.html) |
[Next >](10-using-lit-html.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
