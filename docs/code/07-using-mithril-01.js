/*global m, mergerino*/
const merge = mergerino;

const actions = {
  increment: (cell, amount) =>
    cell.update({ value: (x) => x + amount }),

  changeUnits: (cell) =>
    cell.update(
      cell.state.units === 'C'
        ? {
            units: 'F',
            value: (value) => Math.round((value * 9) / 5 + 32)
          }
        : {
            units: 'C',
            value: (value) => Math.round(((value - 32) / 9) * 5)
          }
    )
};

const view = (cell) =>
  m(
    'div',
    m(
      'div',
      m(
        'label',
        'Temperature: ',
        cell.state.value,
        m.trust('&deg;'),
        cell.state.units
      )
    ),
    m(
      'div',
      m(
        'button',
        { onclick: () => actions.increment(cell, 1) },
        'Increment'
      ),
      m(
        'button',
        { onclick: () => actions.increment(cell, -1) },
        'Decrement'
      ),
      m(
        'button',
        { onclick: () => actions.changeUnits(cell) },
        'Change Units'
      )
    )
  );

const app = {
  initial: {
    value: 22,
    units: 'C'
  },
  view
};

const update = m.stream();
const states = m.stream.scan(merge, app.initial, update);
const cells = states.map((state) => ({ state, update }));

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});
