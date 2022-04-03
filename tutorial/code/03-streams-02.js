/*global flyd*/
// eslint-disable-next-line no-unused-vars
const actions = {
  increment: (update) => {
    update(1);
  },
  decrement: (update) => {
    update(-1);
  }
};

const app = {
  initial: {
    value: 0
  }
};

const update = flyd.stream();
const states = flyd.scan(
  (state, increment) => {
    state.value = state.value + increment;
    return state;
  },
  app.initial,
  update
);

states.map((state) => {
  document.write('<pre>' + JSON.stringify(state) + '</pre>');
});
