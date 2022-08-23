/* global Meiosis, React, ReactDOM */

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

const cells = Meiosis.setup({ app });

const root = ReactDOM.createRoot(
  document.getElementById('app'));

cells.map((cell) => {
  root.render(app.view(cell));
});
