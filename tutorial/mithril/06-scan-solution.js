/*global m*/

// -- Utility code

var stream = function(initial) {
  var mapFunctions = [];
  var createdStream = function(value) {
    for (var i in mapFunctions) {
      mapFunctions[i](value);
    }
  };
  createdStream.map = function(mapFunction) {
    var newInitial = undefined;
    if (initial !== undefined) {
      newInitial = mapFunction(initial);
    }
    var newStream = stream(newInitial);

    mapFunctions.push(function(value) {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
};

var scan = function(accumulator, initial, sourceStream) {
  var newStream = stream(initial);
  var accumulated = initial;

  sourceStream.map(function(value) {
    accumulated = accumulator(accumulated, value);
    newStream(accumulated);
  });

  return newStream;
};

// -- Application code

var createView = function(update) {
  var increase = function(amount) {
    return function(_event) {
      // Send objects onto the update stream
      update({ oper: "add", value: amount });
    };
  };
  var multiply = function(amount) {
    return function(_event) {
      update({ oper: "times", value: amount });
    };
  };
  var view = function(model) {
    return [
      m("div", "Counter: " + model),
      m("button", { onclick: increase(1) }, "+1"),
      m("button", { onclick: multiply(2) }, "*2")
    ];
  };
  return view;
};

// -- Meiosis pattern setup code

var update = stream();
var view = createView(update);

// Look at the object's oper and value to perform the operation
var models = scan(function(model, obj) {
  if (obj.oper === "add") {
    return model + obj.value;
  }
  else if (obj.oper === "times") {
    return model * obj.value;
  }
  else {
    return model;
  }
}, 0, update);

var element = document.getElementById("app");

models.map(function(model) {
  m.render(element, view(model));
});
