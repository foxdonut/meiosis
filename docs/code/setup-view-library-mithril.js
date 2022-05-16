/* global Meiosis, m */

const actions = {
  increment: (cell) => {
    cell.update({ counter: (value) => value + 1 });
  }
};

const app = {
  initial: { counter: 0 },
  view: (cell) =>
    m(
      'div',
      m('div', 'Counter: ', cell.state.counter),
      m(
        'button.btn.btn-primary.btn-sm',
        {
          onclick: () => actions.increment(cell)
        },
        'Increment'
      )
    )
};

const cells = Meiosis.mergerino.setup({ app });

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});

cells.map(() => m.redraw());
