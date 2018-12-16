# [Meiosis](https://meiosis.js.org) Tutorial

[Table of Contents](toc.html)

## 03 - Update State

In the previous lesson, [02 - Render Method](02-render-method-react.html), we passed a `state`
prop to our component so that we could render according to the state.

Now, how do we make a change to the state and refresh the view?

Our state is a counter that has a value of `0`. Let's add a button to increase the counter.

### React state

To make changes to the state and refresh the view, we can use React's `state`. For this to work,
the first thing we need to do is change our `state` to an object:

```javascript
var state = {
  value: 0
};
```

Next, when we pass this state to our component, we'll initialize the React state. We'll also
use this state to render the value of the counter:

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }
  render() {
    var state = this.state;
    return (<div>
      <div>Counter: {state.value}</div>
    </div>);
  }
}
```

### Increase Action

Now, we'll create an `actions` object with an `increase` function that increments the counter.

```javascript
var state = {
  value: 0
};

var actions = {
  increase: function() {
    state.value = state.value + 1;
  }
};
```

That increments the counter, but has no way of sending the updated state back. For this purpose,
we'll wrap `actions` in a function that gets an `update` callback:

```javascript
var state = {
  value: 0
};

var actions = function(update) {
  return {
    increase: function() {
      state.value = state.value + 1;
      update(state);
    }
  };
};
```

After updating the state, the `increase` function sends it back by calling `update(state)`.

To be able to access `actions` from our `App` component, we'll pass it as a prop:

```javascript
ReactDOM.render(<App state={state} actions={actions} />, element);
```

That way, we'll be able to call actions from the view.

### React setState

To update React state and automatically refresh the view, we need to call `setState`. This
is the function that we will pass as `update` to the actions. Now, when we call `increase()`,
it will call `setState` with the state's value having been incremented by 1, and we will see
the change in the view.

Our `render` method is now:

```javascript
render() {
  var state = this.state;
  var setState = this.setState.bind(this);
  var actions = this.props.actions(setState);
  return (<div>
    <div>Counter: {state.value}</div>
    <button onClick={() => actions.increase()}>+1</button>
  </div>);
}
```

Notice what we are achieving here:

- The application state is a separate object.
- The actions are also separate; the `update` that we pass in is a way to send updated state
back.
- The React `state` and `setState` are used to "wire" in the state to the component and
automatically refresh the view. We only need to do this one time, in one component.

You can see the working code below.

@flems react/03-update-state.jsx,app.html,app.css react,react-dom 550

### Exercises

1. Add a `-1` button that decreases the value by 1.

### Solution

@flems react/03-update-state-solution.jsx,app.html,app.css react,react-dom 750 hidden

When you are ready, continue on to [04 - Update Function](04-update-function-react.html).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
