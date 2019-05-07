/*global flyd*/
var app = {
  Initial: function() {
    return {
      value: 0
    };
  },
  Actions: function(update) {
    return {
      increment: function() {
        update(1);
      },
      decrement: function() {
        update(-1);
      }
    };
  }
};

var update = flyd.stream();
var states = flyd.scan(
  function(state, increment) {
    state.value = state.value + increment;
    return state;
  },
  app.Initial(),
  update
);

var actions = app.Actions(update);
states.map(function(state) {
  document.write("<pre>" + JSON.stringify(state) + "</pre>");
});
