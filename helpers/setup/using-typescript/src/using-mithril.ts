// mithril + mergerino + mithril-stream
import { App, MeiosisCell, setup } from '../../source/dist/mergerino';
import m from 'mithril';
import Stream from 'mithril/stream';
import {
  Condition,
  DomEvent,
  InitialTemperature,
  Sky,
  State,
  TemperatureState,
  convert
} from './common';

const conditionsActions = {
  togglePrecipitations: (cell: MeiosisCell<Condition>, value: boolean) => {
    cell.update({ precipitations: value });
  },
  changeSky: (cell: MeiosisCell<Condition>, value: Sky) => {
    cell.update({ sky: value });
  }
};

const SkyOption: m.Component<{ cell: MeiosisCell<Condition>; value: string; label: string }> = {
  view: ({ attrs: { cell, value, label } }) =>
    m(
      'label',
      m('input', {
        type: 'radio',
        value,
        checked: cell.state.sky === value,
        onchange: (evt: DomEvent) => conditionsActions.changeSky(cell, evt.target.value as Sky)
      }),
      label
    )
};

const conditions: App<Condition> = {
  initial: {
    precipitations: false,
    sky: 'SUNNY'
  },
  view: (cell) =>
    m(
      'div',
      m(
        'label',
        m('input', {
          type: 'checkbox',
          checked: cell.state.precipitations,
          onchange: (evt: DomEvent) =>
            conditionsActions.togglePrecipitations(cell, evt.target.checked)
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
  increment: (cell: MeiosisCell<TemperatureState>, amount: number) => {
    cell.update({ value: (x) => x + amount });
  },
  changeUnits: (cell: MeiosisCell<TemperatureState>) => {
    cell.update((state) => {
      const value = state.value;
      const newUnits = state.units === 'C' ? 'F' : 'C';
      const newValue = convert(value, newUnits);
      return { ...state, value: newValue, units: newUnits };
    });
  }
};

const createTemperature = (label: string): App<TemperatureState> => ({
  initial: InitialTemperature(label),
  view: (cell) =>
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
});

const app: App<State> = {
  nested: {
    conditions,
    airTemperature: createTemperature('Air'),
    waterTemperature: createTemperature('Water')
  }
};

const AppView: m.Component<{ cell: MeiosisCell<State> }> = {
  view: ({ attrs: { cell } }) =>
    m(
      'div',
      { style: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
      m(
        'div',
        cell.nested.conditions.view(cell),
        cell.nested.airTemperature.view(cell),
        cell.nested.waterTemperature.view(cell)
      ),
      m('pre', { style: { margin: '0' } }, JSON.stringify(cell.state, null, 4))
    )
};

export const setupMithrilExample = (): void => {
  const cells = setup<State>({ stream: Stream, app });

  m.mount(document.getElementById('mithrilApp') as HTMLElement, {
    view: () => m(AppView, { cell: cells() })
  });

  cells.map(() => m.redraw());
};
