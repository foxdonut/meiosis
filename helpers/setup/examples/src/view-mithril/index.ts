import { meiosisSetup } from 'meiosis-setup';
import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
import m from 'mithril';

interface State {
  value: number;
}

const actions = {
  increment: (cell: MeiosisCell<State>, amount: number) =>
    cell.update({ value: (x) => x + amount })
};

const app: MeiosisViewComponent<State> = {
  initial: {
    value: 22
  },
  view: (cell) =>
    m('div',
      m('div',
        m('label', 'Temperature: ', cell.state.value,
          m.trust('&deg;'), 'C')
      ),
      m('div',
        m('button.btn.btn-primary.btn-sm',
          { onclick: () => actions.increment(cell, 1) },
          'Increment'
        ),
        m('button.btn.btn-primary.btn-sm.ms-1',
          { onclick: () => actions.increment(cell, -1) },
          'Decrement'
        )
      )
    )
};

const cells = meiosisSetup<State>({ app });

const element = document.getElementById('app');

if (element) {
  m.mount(element, {
    view: () => app.view(cells())
  });

  cells.map(() => m.redraw());
}
