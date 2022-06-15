// preact + functionPatches + simple-stream
import { setup } from '../../../source/dist/functionPatches';
import { h, render as preactRender } from 'preact';
import _ from 'lodash/fp';

const actions = {
  increment: (cell, amount) => cell.update(_.update('value', (x) => x + amount))
};

const app = {
  initial: {
    value: 22
  },
  view: (cell) =>
    h('div', {},
      h('div', {},
        h('label', {},
          'Temperature: ',
          cell.state.value,
          h('span', { dangerouslySetInnerHTML: { __html: '&deg;' } }),
          'C'
        )
      ),
      h('div', {},
        h('button',
          { className: 'btn btn-primary btn-sm', onclick: () => actions.increment(cell, 1) },
          'Increment'
        ),
        h('button',
          { className: 'btn btn-primary btn-sm ms-1', onclick: () => actions.increment(cell, -1) },
          'Decrement'
        )
      )
    )
};

export const setupPreactExample = () => {
  const cells = setup({ app });
  const element = document.getElementById('jsPreactApp');
  cells.map((cell) => {
    preactRender(app.view(cell), element);
  });
};
