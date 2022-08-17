import { meiosisSetup } from 'meiosis-setup';
import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
import { h, render } from 'preact';

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
    h('div', {},
      h('div', {}, `Temperature: ${cell.state.value} C`),
      h('div', {},
        h('button', {
          className: 'btn btn-primary btn-sm',
          onClick: () => actions.increment(cell, 1)
        },
          'Increment'
        ),
        h('button', {
          className: 'btn btn-primary btn-sm ms-1',
          onClick: () => actions.increment(cell, -1)
        },
          'Decrement'
        )
      )
    )
};

const cells = meiosisSetup<State>({ app });

const element = document.getElementById('app') as HTMLElement;
cells.map((cell) => {
  render(app.view(cell), element);
});
