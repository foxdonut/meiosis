/*global ReactDOM*/
var view = function(model) {
  return <div>Counter: {model}</div>;
};

var initial = 0;
var element = document.getElementById("app");
ReactDOM.render(view(initial), element);
