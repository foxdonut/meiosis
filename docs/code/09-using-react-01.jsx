/*global React, ReactDOM, flyd, mergerino*/
const merge = mergerino;

const actions = {
  increment: (cell, amount) =>
    cell.update({ value: (x) => x + amount }),

  changeUnits: (cell) =>
    cell.update(
      cell.state.units === 'C'
        ? {
            units: 'F',
            value: (value) => Math.round((value * 9) / 5 + 32)
          }
        : {
            units: 'C',
            value: (value) => Math.round(((value - 32) / 9) * 5)
          }
    )
};

const view = (cell) => (
  <div>
    <div>
      <label>
        Temperature: {cell.state.value}&deg;{cell.state.units}
      </label>
    </div>
    <div>
      <button onClick={() => actions.increment(cell, 1)}>
        Increment
      </button>
      <button onClick={() => actions.increment(cell, -1)}>
        Decrement
      </button>
      <button onClick={() => actions.changeUnits(cell)}>
        Change Units
      </button>
    </div>
  </div>
);

const app = {
  initial: {
    value: 22,
    units: 'C'
  },
  view
};

const update = flyd.stream();
const states = flyd.scan(merge, app.initial, update);
const createCell = (state) => ({ state, update });
const cells = states.map(createCell);

const element = document.getElementById('app');
cells.map((cell) => {
  ReactDOM.render(app.view(cell), element);
});
