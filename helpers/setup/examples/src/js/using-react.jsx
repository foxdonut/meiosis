// @ts-check
// react + mergerino + flyd
import { setup } from '../../../source/dist/mergerino';
import flyd from 'flyd';
import React from 'react';
import { createRoot } from 'react-dom/client';

const actions = {
  increment: (cell, amount) => cell.update({ value: (x) => x + amount })
};

const view = (cell) => (
  <div>
    <div>Temperature: {cell.state.value}&deg;C</div>
    <div>
      <button className="btn btn-primary me-1" onClick={() => actions.increment(cell, 1)}>
        Increment
      </button>
      <button className="btn btn-primary me-1" onClick={() => actions.increment(cell, -1)}>
        Decrement
      </button>
    </div>
  </div>
);

const app = {
  initial: {
    value: 22
  },
  view
};

export const setupReactExample = () => {
  const cells = setup({ stream: flyd, app });
  const element = document.getElementById('jsReactApp');
  const root = createRoot(element);
  cells.map((cell) => {
    root.render(app.view(cell));
  });
};
