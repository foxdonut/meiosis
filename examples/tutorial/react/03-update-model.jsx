/*global ReactDOM*/
var model = 0;

var increase = function(_event) {
  model = model + 1;
  ReactDOM.render(view(model), element);
};

var view = function(model) {
  return (<div>
    <div>Counter: {model}</div>
    <button onClick={increase}>+1</button>
  </div>);
};

var element = document.getElementById("app");
ReactDOM.render(view(model), element);
