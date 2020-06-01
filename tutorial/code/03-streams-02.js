/*global flyd*/
var app = {
  initial: {
    value: 0
  },
  Actions: function (update) {
    return {
      increment: function () {
        update(1);
      },
      decrement: function () {
        update(-1);
      }
    };
  }
};

var update = flyd.stream();
var states = flyd.scan(
  function (state, increment) {
    state.value = state.value + increment;
    return state;
  },
  app.initial,
  update
);

// eslint-disable-next-line no-unused-vars
var actions = app.Actions(update);
states.map(function (state) {
  document.write("<pre>" + JSON.stringify(state) + "</pre>");
});
