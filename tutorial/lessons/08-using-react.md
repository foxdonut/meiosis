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

The `App` component retrieves `states` and `actions` from the passed-in props. We initialize
the React state, `this.state`, from the first value of the `states` stream. Then, in the
`componentDidMount` lifecycle method, we `map` the `states` stream and call `setState` so
that the view gets re-rendered when the state is updated.

In the `render` method, we retrieve the state from `this.state`, and the `actions` from the
props. We pass these on to other components, in this case `Conditions` and `Temperature`,
as props. Notice that we have two instances of `Temperature`, and we pass a different `id`
to each one.

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.states();
  }
  componentDidMount() {
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

Note that React will technically call `render()` twice initially: once after the constructor,
and once after `componentDidMount`. This may or may not be a problem depending on your
application. To prevent this, we can use a `skippedFirst` flag so that we don't initially
render twice:

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.states();
    this.skippedFirst = false;
  }
  componentDidMount() {
    var setState = this.setState.bind(this);
    this.props.states.map(function(state) {
      if (this.skippedFirst) {
        setState(state);
      }
      else {
        this.skippedFirst = true;
      }
    });
  }
  render() {
    // same as before
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

class Conditions extends React.Component {
  render() {
    var { state, actions, id } = this.props;
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
        <SkyOption state={state} actions={actions} id={id} value="SUNNY"
          label="Sunny"/>
        <SkyOption state={state} actions={actions} id={id} value="CLOUDY"
          label="Cloudy"/>
        <SkyOption state={state} actions={actions} id={id} value="MIX"
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
class Temperature extends React.Component {
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

@flems code/08-using-react-01.jsx,app.html,app.css flyd,react,react-dom,mergerino 800 shown 60

<a name="takeaways"></a>
### [Takeaways](#takeaways)

We can wire up Meiosis to React using `ReactDOM.render` and passing `states` and `actions` as
props to the top-level `App` React component. This component initializes the React state and
calls `map` on the `states` stream to call `setState` when the state changes and automatically
refresh the view.

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
