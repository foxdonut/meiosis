/* global Meiosis, preact */
/* @jsx preact.h */

const actions = {
  increment: (cell, amount) =>
    cell.update({ value: (x) => x + amount })
};

const app = {
  initial: {
    value: 22
  },
  view: (cell) => (
    <div>
      <div>Temperature: {cell.state.value}&deg;C</div>
      <div>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => actions.increment(cell, 1)}
        >
          Increment
        </button>
        <button
          className="btn btn-primary btn-sm ms-1"
          onClick={() => actions.increment(cell, -1)}
        >
          Decrement
        </button>
      </div>
    </div>
  )
};

const cells = Meiosis.mergerino.setup({ app });

const element = document.getElementById('app');
cells.map((cell) => {
  // eslint-disable-next-line react/no-deprecated
  preact.render(app.view(cell), element);
});
