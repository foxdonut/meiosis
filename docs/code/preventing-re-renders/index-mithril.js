/* global m, mergerino */
const merge = mergerino;

const checkIfStateChanged = (next, prev) =>
  next.attrs.cell.state !== prev.attrs.cell.state;

const entryActions = {
  editEntryValue: (cell, value) => cell.update({ value })
};

const entryNumber = {
  initial: {
    value: ''
  }
};

const EntryNumber = {
  onbeforeupdate: checkIfStateChanged,
  view: ({ attrs: { cell } }) => {
    // eslint-disable-next-line no-console
    console.log('render Entry');

    return m(
      'div',
      m(
        'span',
        { style: { 'margin-right': '8px' } },
        'Entry number:'
      ),
      m('input[type=text][size=2]', {
        value: cell.state.value,
        oninput: (evt) =>
          entryActions.editEntryValue(cell, evt.target.value)
      })
    );
  }
};

const temperatureActions = {
  increment: (cell, amount) => {
    cell.update({ value: (value) => value + amount });
  }
};

const temperature = {
  createInitial: (label) => ({ label, value: 20 })
};

const Temperature = {
  onbeforeupdate: checkIfStateChanged,
  view: ({ attrs: { cell } }) => {
    // eslint-disable-next-line no-console
    console.log('render Temperature', cell.state.label);

    return m(
      'div.row',
      { style: { 'margin-top': '8px' } },
      m(
        'div.col-md-3',
        m(
          'span',
          cell.state.label,
          ' Temperature: ',
          cell.state.value,
          m.trust('&deg;'),
          'C'
        )
      ),
      m(
        'div.col-md-6',
        m(
          'button.btn.btn-sm.btn-secondary',
          {
            onclick: () => temperatureActions.increment(cell, 1)
          },
          'Increment'
        ),
        m(
          'button.btn.btn-sm.btn-secondary',
          {
            onclick: () =>
              temperatureActions.increment(cell, -1)
          },
          'Decrement'
        )
      )
    );
  }
};

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
  view: (cell) =>
    m(
      'div',
      m(EntryNumber, { cell: cell.nest('entry') }),
      m(Temperature, { cell: cell.nest('air') }),
      m(Temperature, { cell: cell.nest('water') }),
      m(
        'div',
        m(
          'button.btn.btn-primary',
          { onclick: () => appActions.save(cell) },
          'Save'
        ),
        m('span', cell.state.saved)
      )
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

const update = m.stream();
const states = m.stream.scan(merge, app.initial, update);
const nest = nestCell(states, update);
const createCell = (state) => ({ state, update, nest });
const cells = states.map(createCell);

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});
