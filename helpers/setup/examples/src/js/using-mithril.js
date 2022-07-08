// @ts-check
// mithril + mergerino + mithril-stream
import { setup } from '../../../source/dist/mergerino';
import m from 'mithril';
import Stream from 'mithril/stream';

const actions = {
  increment: (cell, amount) => cell.update({ value: (x) => x + amount })
};

const app = {
  initial: {
    value: 22
  },
  view: (cell) =>
    m('div',
      m('div', m('label', 'Temperature: ', cell.state.value, m.trust('&deg;'), 'C')),
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

export const setupMithrilExample = () => {
  const cells = setup({ stream: Stream, app });
  const element = document.getElementById('jsMithrilApp');
  if (element) {
    m.mount(element, {
      view: () => app.view(cells())
    });

    cells.map(() => m.redraw());
  }
};
