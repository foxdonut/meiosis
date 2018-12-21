/*global React, ReactDOM, flyd*/
var app = {
  initialState: {
    value: 0
  },
  actions: function(update) {
    return {
      increment: function() {
        update(1);
      },
      decrement: function() {
        update(-1);
      }
    };
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.states();
  }
  componentDidMount() {
    var setState = this.setState.bind(this);
    this.props.states.map(setState);
  }
  render() {
    var state = this.state;
    var actions = this.props.actions;
    return (<div>
      <div>Counter: {state.value}</div>
      <button onClick={() => actions.increment()}>+1</button>
      <button onClick={() => actions.decrement()}>-1</button>
    </div>);
  }
}

var update = flyd.stream();
var states = flyd.scan(function(state, increment) {
  state.value = state.value + increment;
  return state;
}, app.initialState, update);

var actions = app.actions(update);
ReactDOM.render(<App states={states} actions={actions} />,
  document.getElementById("app"));
