/*global React, ReactDOM*/
var state = {
  value: 0
};

var actions = function(update) {
  return {
    increment: function() {
      state.value = state.value + 1;
      update(state);
    },
    // Add a decrement function
    decrement: function() {
      state.value = state.value - 1;
      update(state);
    }
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.state;
  }
  render() {
    var state = this.state;
    var setState = this.setState.bind(this);
    var actions = this.props.actions(setState);
    return (<div>
      <div>Counter: {state.value}</div>
      <button onClick={() => actions.increment()}>+1</button>
      {/* Add a -1 button that decrements the value */}
      <button onClick={() => actions.decrement()}>-1</button>
    </div>);
  }
}

var element = document.getElementById("app");
ReactDOM.render(<App state={state} actions={actions} />, element);
