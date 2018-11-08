/*global React, ReactDOM*/
var view = function(model) {
  return <div>{model.label}: {model.value}</div>;
};

var initial = { label: "The Counter", value: 0 };
var element = document.getElementById("app");
ReactDOM.render(view(initial), element);
