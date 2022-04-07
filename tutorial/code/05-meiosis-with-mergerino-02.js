/*global flyd, mergerino*/
const merge = mergerino;

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
        temperature.units === 'C'
          ? {
              units: 'F',
              value: (value) => Math.round((value * 9) / 5 + 32)
            }
          : {
              units: 'C',
              value: (value) =>
                Math.round(((value - 32) / 9) * 5)
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

states.map((state) => {
  document.write(
    '<pre>' + JSON.stringify(state, null, 2) + '</pre>'
  );
});
