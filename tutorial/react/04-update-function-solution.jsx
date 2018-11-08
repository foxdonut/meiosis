/*global React, ReactDOM*/

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
      <button onClick={increase( 1)}>&times; 1</button>
      <button onClick={increase(-1)}>&times; -1</button>
      {/* Add two buttons which multiply by 5 / -5 */}
      <button onClick={increase( 5)}>&times; 5</button>
      <button onClick={increase(-5)}>&times; -5</button>
    </div>);
  };
  return view;
};

// -- Meiosis pattern setup code

// Change the initial value of the model to 1
var model = 1;
var element = document.getElementById("app");
var view = null;

// Change how the model gets updated, by multiplying instead of adding
var update = function(value) {
  model = model * value;
  ReactDOM.render(view(model), element);
};

view = createView(update);
ReactDOM.render(view(model), element);
