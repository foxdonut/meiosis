// mithril + mergerino + mithril-stream
import { App, MeiosisCell, setup } from '../../source/dist/mergerino';
import m from 'mithril';
import Stream from 'mithril/stream';
import { Conditions, InitialTemperature, Sky, State, Temperature, convert } from './common';

const conditionsActions = {
  togglePrecipitations: (cell: MeiosisCell<Conditions>, value: boolean) => {
    cell.update({ precipitations: value });
  },
  changeSky: (cell: MeiosisCell<Conditions>, value: Sky) => {
    cell.update({ sky: value });
  }
};

const conditions: App<Conditions> = {
  initial: {
    precipitations: false,
    sky: 'SUNNY'
  }
};

const SkyOption: m.Component<{ cell: MeiosisCell<Conditions>; value: string; label: string }> = {
  view: ({ attrs: { cell, value, label } }) =>
    m(
      'label',
      m('input', {
        type: 'radio',
        value,
        checked: cell.state.sky === value,
        // FIXME: evt type
        onchange: (evt) => conditionsActions.changeSky(cell, evt.target.value)
      }),
      label
    )
};

const Conditions: m.Component<{ cell: MeiosisCell<Conditions> }> = {
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

const createTemperature = (label: string) => ({
  initial: InitialTemperature(label)
});

const temperatureActions = {
  increment: (cell: MeiosisCell<Temperature>, amount: number) => {
    cell.update({ value: (x) => x + amount });
  },
  changeUnits: (cell: MeiosisCell<Temperature>) => {
    cell.update((state) => {
      const value = state.value;
      const newUnits = state.units === 'C' ? 'F' : 'C';
      const newValue = convert(value, newUnits);
      return { ...state, value: newValue, units: newUnits };
    });
  }
};

const Temperature: m.Component<{ cell: MeiosisCell<Temperature> }> = {
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

const AppView: m.Component<{ cell: MeiosisCell<State> }> = {
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

const app: App<State> = {
  nested: {
    conditions,
    temperature: {
      nested: {
        air: createTemperature('Air'),
        water: createTemperature('Water')
      }
    }
  }
};

export const setupMithrilExample = (): void => {
  const cells = setup<State>({ stream: Stream, app });

  m.mount(document.getElementById('mithrilApp') as HTMLElement, {
    view: () => m(AppView, { cell: cells() })
  });

  cells.map(() => m.redraw());
};
