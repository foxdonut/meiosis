// preact + functionPatches + simple-stream

import { App, MeiosisCell, setup } from '../../source/dist/functionPatches';
import { h, render as preactRender } from 'preact';
import { add, assoc, over, lensProp } from 'rambda';
import { Condition, InitialTemperature, Sky, State, Temperature, convert } from './common';

const conditionsActions = {
  togglePrecipitations: (cell: MeiosisCell<Condition>, value: boolean) => {
    cell.update(assoc('precipitations', value));
  },
  changeSky: (cell: MeiosisCell<Condition>, value: Sky) => {
    cell.update(assoc('sky', value));
  }
};

const conditions: App<Condition> = {
  initial: {
    precipitations: false,
    sky: 'SUNNY'
  }
};

// Normally we could use JSX with the Preact.h pragma, but since we already have React in this
// file, we'll use h here.
const SkyOption = ({
  cell,
  value,
  label
}: {
  cell: MeiosisCell<Condition>;
  value: string;
  label: string;
}) =>
  h(
    'label',
    {},
    h('input', {
      type: 'radio',
      value,
      checked: cell.state.sky === value,
      onchange: (evt) => conditionsActions.changeSky(cell, evt.target.value)
    }),
    label
  );

const Conditions = ({ cell }: { cell: MeiosisCell<Condition> }) =>
  h(
    'div',
    {},
    h(
      'label',
      {},
      h('input', {
        type: 'checkbox',
        checked: cell.state.precipitations,
        onchange: (evt) => conditionsActions.togglePrecipitations(cell, evt.target.checked)
      }),
      'Precipitations'
    ),
    h(
      'div',
      {},
      h(SkyOption, { cell, value: 'SUNNY', label: 'Sunny' }),
      h(SkyOption, { cell, value: 'CLOUDY', label: 'Cloudy' }),
      h(SkyOption, { cell, value: 'MIX', label: 'Mix of sun/clouds' })
    )
  );

const createTemperature = (label: string) => ({
  initial: InitialTemperature(label)
});

const temperatureActions = {
  increment: (cell: MeiosisCell<Temperature>, amount: number) => {
    cell.update(over(lensProp('value'), add(amount)));
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

const Temperature = ({ cell }: { cell: MeiosisCell<Temperature> }) =>
  h(
    'div',
    {},
    cell.state.label,
    ' Temperature: ',
    cell.state.value,
    h('span', { dangerouslySetInnerHTML: { __html: '&deg;' } }),
    cell.state.units,
    h(
      'div',
      {},
      h('button', { onclick: () => temperatureActions.increment(cell, 1) }, 'Increment'),
      h('button', { onclick: () => temperatureActions.increment(cell, -1) }, 'Decrement')
    ),
    h(
      'div',
      {},
      h('button', { onclick: () => temperatureActions.changeUnits(cell) }, 'Change Units')
    )
  );

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

const AppView = ({ cell }: { cell: MeiosisCell<State> }) =>
  h(
    'div',
    { style: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
    h(
      'div',
      {},
      h(Conditions, { cell: cell.nest('conditions') }),
      h(Temperature, { cell: cell.nest('temperature').nest('air') }),
      h(Temperature, { cell: cell.nest('temperature').nest('water') })
    ),
    h('pre', { style: { margin: '0' } }, JSON.stringify(cell.state, null, 4))
  );

export const setupPreactExample = (): void => {
  const cells = setup<State>({ app });
  const element = document.getElementById('preactApp') as HTMLElement;
  cells.map((cell) => {
    preactRender(h(AppView, { cell }), element);
  });
};
