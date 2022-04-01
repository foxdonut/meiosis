// @ts-check
// mithril + mergerino + mithril-stream
import meiosis from '../../../source/dist/index';
import m from 'mithril';
import Stream from 'mithril/stream';
import { app, convert } from './common';

const conditionsActions = {
  togglePrecipitations: (cell, value) => {
    cell.update({ precipitations: value });
  },
  changeSky: (cell, value) => {
    cell.update({ sky: value });
  }
};

const SkyOption = {
  view: ({ attrs: { cell, value, label } }) =>
    m(
      'label',
      m('input', {
        type: 'radio',
        value,
        checked: cell.state.sky === value,
        onchange: (evt) => conditionsActions.changeSky(cell, evt.target.value)
      }),
      label
    )
};

const Conditions = {
  view: ({ attrs: { cell } }) =>
    m(
      'div',
      m(
        'label',
        m('input', {
          type: 'checkbox',
          checked: cell.state.precipitations,
          onchange: (evt) => conditionsActions.togglePrecipitations(cell, evt.target.checked)
        }),
        'Precipitations'
      ),
      m(
        'div',
        m(SkyOption, { cell, value: 'SUNNY', label: 'Sunny' }),
        m(SkyOption, { cell, value: 'CLOUDY', label: 'Cloudy' }),
        m(SkyOption, { cell, value: 'MIX', label: 'Mix of sun/clouds' })
      )
    )
};

const temperatureActions = {
  increment: (cell, amount) => {
    cell.update({ value: (x) => x + amount });
  },
  changeUnits: (cell) => {
    cell.update((state) => {
      const value = state.value;
      const newUnits = state.units === 'C' ? 'F' : 'C';
      const newValue = convert(value, newUnits);
      return { ...state, value: newValue, units: newUnits };
    });
  }
};

const Temperature = {
  view: ({ attrs: { cell } }) =>
    m(
      'div',
      cell.state.label,
      ' Temperature: ',
      cell.state.value,
      m.trust('&deg;'),
      cell.state.units,
      m(
        'div',
        m('button', { onclick: () => temperatureActions.increment(cell, 1) }, 'Increment'),
        m('button', { onclick: () => temperatureActions.increment(cell, -1) }, 'Decrement')
      ),
      m('div', m('button', { onclick: () => temperatureActions.changeUnits(cell) }, 'Change Units'))
    )
};

const App = {
  view: ({ attrs: { cell } }) =>
    m(
      'div',
      { style: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
      m(
        'div',
        m(Conditions, { cell: cell.nest('conditions') }),
        m(Temperature, { cell: cell.nest('temperature').nest('air') }),
        m(Temperature, { cell: cell.nest('temperature').nest('water') })
      ),
      m('pre', { style: { margin: '0' } }, JSON.stringify(cell.state, null, 4))
    )
};

export const setupMithrilExample = () => {
  const cells = meiosis.mergerino.setup({ stream: Stream, app });

  m.mount(document.getElementById('jsMithrilApp'), {
    view: () => m(App, { cell: cells() })
  });

  cells.map(() => m.redraw());
};
