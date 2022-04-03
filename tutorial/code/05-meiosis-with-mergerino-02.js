/*global flyd, mergerino*/
const merge = mergerino;

const convert = function (value, to) {
  return Math.round(
    to === 'C' ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32
  );
};

// eslint-disable-next-line no-unused-vars
const actions = {
  increment: (update, amount) => {
    update({
      temperature: {
        value: (x) => x + amount
      }
    });
  },
  changeUnits: (update) => {
    update({
      temperature: (temperature) => {
        const value = temperature.value;
        const newUnits = temperature.units === 'C' ? 'F' : 'C';
        const newValue = convert(value, newUnits);

        return {
          value: newValue,
          units: newUnits
        };
      }
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
const states = flyd.scan(merge, initial, update);

states.map(function (state) {
  document.write(
    '<pre>' + JSON.stringify(state, null, 2) + '</pre>'
  );
});
