/*global React, ReactDOM*/
// Pass an object as the model
var model = { label: "The Counter", value: 0 };

// Change the increase function to increase the model value
var increase = function(_event) {
  model.value = model.value + 1;
  ReactDOM.render(view(model), element);
};

// Add a decrease function
var decrease = function(_event) {
  model.value = model.value - 1;
  ReactDOM.render(view(model), element);
};

// Use the model to produce the view
var view = function(model) {
  return (<div>
    <div>{model.label}: {model.value}</div>
    <button onClick={increase}>+1</button>
    {/* Add a -1 button that decreases the value */}
    <button onClick={decrease}>-1</button>
  </div>);
};

var element = document.getElementById("app");
ReactDOM.render(view(model), element);
