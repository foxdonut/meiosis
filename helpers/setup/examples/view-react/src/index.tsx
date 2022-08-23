import { meiosisSetup } from 'meiosis-setup';
import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
import React from 'react';
import ReactDOM from 'react-dom/client';

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
  view: (cell) => (
    <div>
      <div>Temperature: {cell.state.value}&deg;C</div>
      <div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => actions.increment(cell, 1)}>
          Increment
        </button>
        <button
          className="btn btn-primary btn-sm ms-1"
          onClick={() => actions.increment(cell, -1)}>
          Decrement
        </button>
      </div>
    </div>
  )
};

const cells = meiosisSetup<State>({ app });

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
cells.map((cell) => {
  root.render(app.view(cell));
});
