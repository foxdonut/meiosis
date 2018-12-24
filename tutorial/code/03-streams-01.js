/*global flyd*/
var app = {
  initialState: {
    value: 0
  },
  actions: function(update) {
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
var states = flyd.scan(function(state, increment) {
  state.value = state.value + increment;
  return state;
}, app.initialState, update);

var actions = app.actions(update);
states.map(function(state) {
  document.write("<pre>" + JSON.stringify(state) + "</pre>");
});
