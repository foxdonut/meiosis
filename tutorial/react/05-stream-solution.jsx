/*global React, ReactDOM*/

// -- Utility code

var stream = function() {
  var mapFunctions = [];
  var createdStream = function(value) {
    for (var i in mapFunctions) {
      mapFunctions[i](value);
    }
  };
  createdStream.map = function(mapFunction) {
    var newStream = stream();

    mapFunctions.push(function(value) {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
};

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
var update = stream();
var view = createView(update);

var element = document.getElementById("app");

// Separate out the updateModel function
var updateModel = function(value) {
  model = model + value;
  return model;
};

// Separate out the render function
var render = function(view) {
  ReactDOM.render(view, element);
};

// Chain calls to .map
update
  .map(updateModel)
  .map(view)
  .map(render);

ReactDOM.render(view(model), element);
