/* global Meiosis, preact */
/* @jsx preact.h */

const actions = {
  increment: (cell) => {
    cell.update({ counter: (value) => value + 1 });
  }
};

const app = {
  initial: {
    counter: 0
  },
  view: (cell) => (
    <div>
      <div>Counter: {cell.state.counter}</div>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => actions.increment(cell)}
      >
        Increment
      </button>
    </div>
  )
};

const cells = Meiosis.mergerino.setup({ app });

const element = document.getElementById('app');
cells.map((cell) => {
  // eslint-disable-next-line react/no-deprecated
  preact.render(app.view(cell), element);
});
