// @ts-check
// mithril + mergerino + mithril-stream
import { setup } from '../../../source/dist/mergerino';
import m from 'mithril';
import Stream from 'mithril/stream';

const actions = {
  increment: (cell, amount) => cell.update({ value: (x) => x + amount })
};

/**
 * @template T
 * @typedef {Object} Component
 * @property {T} attrs
 */

/**
 * @typedef {Object} FooAttrs
 * @property {string} name
 */

const Foo = {
  /** @param {Component<FooAttrs>} attrs */
  view: ({ attrs: { name } }) => m('', name)
};

const view = (cell) =>
  m(
    'div',
    m(Foo, { name: 'foo' }),
    m(Foo, { invalid: true }),
    m('div', m('label', 'Temperature: ', cell.state.value, m.trust('&deg;'), 'C')),
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
  );

const app = {
  initial: {
    value: 22
  },
  view
};

export const setupMithrilExample = () => {
  const cells = setup({ stream: Stream, app });

  m.mount(document.getElementById('jsMithrilApp'), {
    view: () => app.view(cells())
  });

  cells.map(() => m.redraw());
};
