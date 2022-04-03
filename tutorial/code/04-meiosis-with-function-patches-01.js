/*global flyd*/
const convert = (value, to) =>
  Math.round(
    to === 'C' ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );

// eslint-disable-next-line no-unused-vars
const actions = {
  increment: (update, amount) => {
    update((state) => {
      const temperature = {
        ...state.temperature,
        value: state.temperature.value + amount
      };
      return {
        ...state,
        temperature
      };
    });
  },
  changeUnits: (update) => {
    update((state) => {
      const value = state.temperature.value;
      const newUnits =
        state.temperature.units === 'C' ? 'F' : 'C';
      const newValue = convert(value, newUnits);

      const temperature = {
        ...state.temperature,
        value: newValue,
        units: newUnits
      };
      return {
        ...state,
        temperature
      };
    });
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
