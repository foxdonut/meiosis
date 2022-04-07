/*global flyd*/

// eslint-disable-next-line no-unused-vars
const actions = {
  increment: (update, amount) => {
    update((state) => ({
      temperature: {
        value: state.temperature.value + amount,
        units: state.temperature.units
      }
    }));
  },
  changeUnits: (update) => {
    update((state) => ({
      temperature:
        state.temperature.units === 'C'
          ? {
              units: 'F',
              value: Math.round(
                (state.temperature.value * 9) / 5 + 32
              )
            }
          : {
              units: 'C',
              value: Math.round(
                ((state.temperature.value - 32) / 9) * 5
              )
            }
    }));
  }
};

const initial = {
  temperature: {
    value: 22,
    units: 'C'
  }
};

const update = flyd.stream();
const states = flyd.scan(
  (state, patch) => patch(state),
  initial,
  update
);

states.map((state) => {
  document.write(
    '<pre>' + JSON.stringify(state, null, 2) + '</pre>'
  );
});
