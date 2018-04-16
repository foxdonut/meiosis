/*global ReactDOM*/

// -- Application code

var createView = function(update) {
  var increase = function(amount) {
    return function(_event) {
      update(amount);
    };
  };
  var view = function(model) {
    return (<div>
      <div>Counter: {model}</div>
      <button onClick={increase( 1)}>+1</button>
      <button onClick={increase(-1)}>-1</button>
    </div>);
  };
  return view;
};

// -- Meiosis pattern setup code

var model = 0;
var element = document.getElementById("app");
var view = null;

var update = function(value) {
  model = model + value;
  ReactDOM.render(view(model), element);
};

view = createView(update);
ReactDOM.render(view(model), element);
