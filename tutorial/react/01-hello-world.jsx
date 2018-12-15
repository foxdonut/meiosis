/*global React, ReactDOM*/
class App extends React.Component {
  render() {
    return (<h1>Hello, world</h1>);
  }
}
var element = document.getElementById("app");
ReactDOM.render(<App />, element);
