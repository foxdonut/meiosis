/*global flyd, _, preact*/
/** @jsx preact.h */

const conditionsActions = {
  togglePrecipitations: (cell, value) =>
    cell.update(_.set('precipitations', value)),

  changeSky: (cell, value) => cell.update(_.set('sky', value))
};

const conditionsOption = ({ cell, value, label }) => (
  <label>
    <input
      type="radio"
      id={value}
      name="conditions"
      value={value}
      checked={cell.state.sky === value}
      onChange={(evt) =>
        conditionsActions.changeSky(cell, evt.target.value)
      }
    />
    <span style={{ marginLeft: '5px', marginRight: '10px' }}>
      {label}
    </span>
  </label>
);

const conditions = {
  initial: {
    precipitations: false,
    sky: null
  },
  view: (cell) => (
    <div style={{ marginTop: '10px' }}>
      <label>
        <input
          type="checkbox"
          checked={cell.state.precipitations}
          onChange={(evt) =>
            conditionsActions.togglePrecipitations(
              cell,
              evt.target.checked
            )
          }
        />
        <span style={{ marginLeft: '5px' }}>
          Precipitations
        </span>
      </label>
      <div>
        {conditionsOption({
          cell,
          value: 'SUNNY',
          label: 'Sunny'
        })}
        {conditionsOption({
          cell,
          value: 'CLOUDY',
          label: 'Cloudy'
        })}
        {conditionsOption({
          cell,
          value: 'MIX',
          label: 'Mix'
        })}
      </div>
    </div>
  )
};

const temperatureActions = {
  increment: (cell, amount) =>
    cell.update(_.update('value', (x) => x + amount))
};

const temperature = {
  initial: {
    value: 22
  },
  view: (cell) => (
    <div className="mt-2">
      <div>
        <label>Temperature: {cell.state.value}&deg;C</label>
      </div>
      <div>
        <button
          className="btn btn-primary btn-sm me-1"
          onClick={() => temperatureActions.increment(cell, 1)}
        >
          Increment
        </button>
        <button
          className="btn btn-primary btn-sm me-1"
          onClick={() => temperatureActions.increment(cell, -1)}
        >
          Decrement
        </button>
      </div>
    </div>
  )
};

const app = {
  initial: {
    conditions: conditions.initial,
    temperature: {
      air: temperature.initial,
      water: temperature.initial
    }
  },
  view: (cell) => (
    <div>
      {conditions.view(cell.nest('conditions'))}
      {temperature.view(cell.nest('temperature').nest('air'))}
      {temperature.view(cell.nest('temperature').nest('water'))}
      <pre>{JSON.stringify(cell.state, null, 2)}</pre>
    </div>
  )
};

const nestPatch = (patch, prop) => (state) =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });

const nestUpdate = (parentUpdate, prop) => (patch) =>
  parentUpdate(nestPatch(patch, prop));

const nestCell = (getState, parentUpdate) => (prop) => {
  const getNestedState = () => getState()[prop];
  const nestedUpdate = nestUpdate(parentUpdate, prop);

  return {
    state: getNestedState(),
    update: nestedUpdate,
    nest: nestCell(getNestedState, nestedUpdate)
  };
};

const update = flyd.stream();
const states = flyd.scan(
  (state, patch) => patch(state),
  app.initial,
  update
);
const nest = nestCell(states, update);
const createCell = (state) => ({ state, update, nest });
const cells = states.map(createCell);

const element = document.getElementById('app');
cells.map((cell) => {
  // eslint-disable-next-line react/no-deprecated
  preact.render(app.view(cell), element);
});
