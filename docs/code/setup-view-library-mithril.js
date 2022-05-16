/* global Meiosis, m */

const actions = {
  increment: (cell, amount) =>
    cell.update({ value: (x) => x + amount })
};

const app = {
  initial: {
    value: 22
  },
  view: (cell) =>
    m(
      'div',
      m(
        'div',
        m(
          'label',
          'Temperature: ',
          cell.state.value,
          m.trust('&deg;'),
          'C'
        )
      ),
      m(
        'div',
        m(
          'button.btn.btn-primary.btn-sm',
          { onclick: () => actions.increment(cell, 1) },
          'Increment'
        ),
        m(
          'button.btn.btn-primary.btn-sm.ms-1',
          { onclick: () => actions.increment(cell, -1) },
          'Decrement'
        )
      )
    )
};

const cells = Meiosis.mergerino.setup({ app });

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});

cells.map(() => m.redraw());
