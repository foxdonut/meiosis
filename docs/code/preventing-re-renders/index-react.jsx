/* global React, ReactDOM, flyd, mergerino */
const merge = mergerino;

class ReRenderOnStateChangeComponent extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.cell.state !== this.props.cell.state;
  }
}

const entryActions = {
  editEntryValue: (cell, value) => cell.update({ value })
};

const entryNumber = {
  initial: {
    value: ''
  }
};

class EntryNumber extends ReRenderOnStateChangeComponent {
  render() {
    const { cell } = this.props;
    // eslint-disable-next-line no-console
    console.log('render Entry');

    return (
      <div>
        <span style={{ marginRight: 8 }}>Entry number:</span>
        <input
          type="text"
          size="2"
          value={cell.state.value}
          onChange={(evt) =>
            entryActions.editEntryValue(cell, evt.target.value)
          }
        />
      </div>
    );
  }
}

const temperatureActions = {
  increment: (cell, amount) => {
    cell.update({ value: (value) => value + amount });
  }
};

const temperature = {
  createInitial: (label) => ({ label, value: 20 })
};

class Temperature extends ReRenderOnStateChangeComponent {
  render() {
    const { cell } = this.props;
    // eslint-disable-next-line no-console
    console.log('render Temperature', cell.state.label);

    return (
      <div className="row" style={{ marginTop: 8 }}>
        <div className="col-md-3">
          <span>
            {cell.state.label} Temperature:
            {cell.state.value}&deg;C
          </span>
        </div>
        <div className="col-md-6">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() =>
              temperatureActions.increment(cell, 1)
            }
          >
            Increment
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() =>
              temperatureActions.increment(cell, -1)
            }
          >
            Decrement
          </button>
        </div>
      </div>
    );
  }
}

const displayTemperature = (temperature) =>
  temperature.label + ': ' + temperature.value + '\xB0 C';

const appActions = {
  save: (cell) => {
    cell.update({
      saved:
        ' Entry #' +
        cell.state.entry.value +
        ':' +
        displayTemperature(cell.state.air) +
        ' ' +
        displayTemperature(cell.state.water),

      air: { value: 20 },
      water: { value: 20 },
      entry: { value: '' }
    });
  }
};

const app = {
  initial: {
    saved: '',
    entry: entryNumber.initial,
    air: temperature.createInitial('Air'),
    water: temperature.createInitial('Water')
  },
  view: (cell) => (
    <div>
      <EntryNumber cell={cell.nest('entry')} />
      <Temperature cell={cell.nest('air')} />
      <Temperature cell={cell.nest('water')} />
      <div>
        <button
          className="btn btn-primary"
          onClick={() => appActions.save(cell)}
        >
          Save
        </button>
        <div>{cell.state.saved}</div>
      </div>
    </div>
  )
};

const nestPatch = (patch, prop) => ({ [prop]: patch });

const nestUpdate = (parentUpdate, prop) => (patch) =>
  parentUpdate(nestPatch(patch, prop));

const nestCell = (getState, parentUpdate) => (prop) => {
  const getNestedState = () => getState()[prop];
  const nestedUpdate = nestUpdate(parentUpdate, prop);

  const nested = {
    state: getNestedState(),
    update: nestedUpdate,
    nest: nestCell(getNestedState, nestedUpdate)
  };

  return nested;
};

const update = flyd.stream();
const states = flyd.scan(merge, app.initial, update);
const nest = nestCell(states, update);
const createCell = (state) => ({ state, update, nest });
const cells = states.map(createCell);

const element = document.getElementById('app');
cells.map((cell) => {
  ReactDOM.render(app.view(cell), element);
});
