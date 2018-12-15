/*global React, ReactDOM*/
class App extends React.Component {
  render() {
    var state = this.props.state;
    return (<div>{state.label}: {state.value}</div>);
  }
}
var initialState = { label: "The Counter", value: 0 };
var element = document.getElementById("app");
ReactDOM.render(<App state={initialState} />, element);
