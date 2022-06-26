/*global m, mergerino*/
const merge = mergerino;

const actions = {
  increment: (cell, amount) =>
    cell.update({ value: (x) => x + amount })
};

const view = (cell) =>
  m('div',
    m('div',
      m('label', 'Temperature: ',
        cell.state.value, m.trust('&deg;'), cell.state.units)
    ),
    m('div',
      m('button',
        { onclick: () => actions.increment(cell, 1) },
        'Increment'),
      m('button',
        { onclick: () => actions.increment(cell, -1) },
        'Decrement')
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
const createCell = (state) => ({ state, update });
const cells = states.map(createCell);

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});
