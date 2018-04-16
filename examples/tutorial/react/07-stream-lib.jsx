/*global ReactDOM, flyd*/

// -- Application code

var createView = function(update) {
  var oper = function(obj) {
    return function(_event) {
      update(obj);
    };
  };
  var view = function(model) {
    return (<div>
      <div>Counter: {model}</div>
      <button onClick={oper({ oper: "add", value: 1 })}>+1</button>
      <button onClick={oper({ oper: "times", value: 2 })}>*2</button>
    </div>);
  };
  return view;
};

// -- Meiosis pattern setup code

var update = flyd.stream();
var view = createView(update);

var models = flyd.scan(function(model, obj) {
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
  ReactDOM.render(view(model), element);
});
