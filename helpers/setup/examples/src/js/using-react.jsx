// @ts-check
// react + mergerino + flyd
import { setup } from '../../../source/dist/mergerino';
import flyd from 'flyd';
import React from 'react';
import { createRoot } from 'react-dom/client';

const actions = {
  increment: (cell, amount) => cell.update({ value: (x) => x + amount })
};

const app = {
  initial: {
    value: 22
  },
  view: (cell) => (
    <div>
      <div>Temperature: {cell.state.value}&deg;C</div>
      <div>
        <button className="btn btn-primary btn-sm" onClick={() => actions.increment(cell, 1)}>
          Increment
        </button>
        <button className="btn btn-primary btn-sm ms-1" onClick={() => actions.increment(cell, -1)}>
          Decrement
        </button>
      </div>
    </div>
  )
};

export const setupReactExample = () => {
  const cells = setup({ stream: flyd, app });
  const element = document.getElementById('jsReactApp');
  if (element) {
    const root = createRoot(element);
    cells.map((cell) => {
      root.render(app.view(cell));
    });
  }
};
