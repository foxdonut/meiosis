/*global React, ReactDOM*/
class App extends React.Component {
  render() {
    return (<div>Counter: {this.props.state}</div>);
  }
}
var initialState = 0;
var element = document.getElementById("app");
ReactDOM.render(<App state={initialState} />, element);
