// react + functionPatches + flyd
import { App, MeiosisCell, setup } from '../../source/dist/functionPatches';
import flyd from 'flyd';
import React from 'react';
import ReactDOM from 'react-dom';
import { Condition, InitialTemperature, Sky, State, Temperature, convert } from './common';

const conditionsActions = {
  togglePrecipitations: (cell: MeiosisCell<Condition>, value: boolean) => {
    cell.update((state) => ({
      ...state,
      precipitations: value
    }));
  },
  changeSky: (cell: MeiosisCell<Condition>, value: Sky) => {
    cell.update((state) => ({
      ...state,
      sky: value
    }));
  }
};

const conditions: App<Condition> = {
  initial: {
    precipitations: false,
    sky: 'SUNNY'
  }
};

const SkyOption = ({
  cell,
  value,
  label
}: {
  cell: MeiosisCell<Condition>;
  value: string;
  label: string;
}) => (
  <label>
    <input
      type="radio"
      value={value}
      checked={cell.state.sky === value}
      onChange={(evt) => conditionsActions.changeSky(cell, evt.target.value)}
    />
    {label}
  </label>
);

const Conditions = ({ cell }: { cell: MeiosisCell<Condition> }) => (
  <div>
    <label>
      <input
        type="checkbox"
        checked={cell.state.precipitations}
        onChange={(evt) => conditionsActions.togglePrecipitations(cell, evt.target.checked)}
      />
      Precipitations
    </label>
    <div>
      <SkyOption cell={cell} value="SUNNY" label="Sunny" />
      <SkyOption cell={cell} value="CLOUDY" label="Cloudy" />
      <SkyOption cell={cell} value="MIX" label="Mix of sun/clouds" />
    </div>
  </div>
);

const createTemperature = (label: string) => ({
  initial: InitialTemperature(label)
});

const temperatureActions = {
  increment: (cell: MeiosisCell<Temperature>, amount: number) => {
    cell.update((state) => ({
      ...state,
      value: state.value + amount
    }));
  },
  changeUnits: (cell: MeiosisCell<Temperature>) => {
    cell.update((state) => {
      const value = state.value;
      const newUnits = state.units === 'C' ? 'F' : 'C';
      const newValue = convert(value, newUnits);

      return {
        ...state,
        value: newValue,
        units: newUnits
      };
    });
  }
};

const Temperature = ({ cell }: { cell: MeiosisCell<Temperature> }) => (
  <div>
    {cell.state.label} Temperature:
    {cell.state.value}&deg;{cell.state.units}
    <div>
      <button onClick={() => temperatureActions.increment(cell, 1)}>Increment</button>
      <button onClick={() => temperatureActions.increment(cell, -1)}>Decrement</button>
    </div>
    <div>
      <button onClick={() => temperatureActions.changeUnits(cell)}>Change Units</button>
    </div>
  </div>
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

const AppView = ({ cell }: { cell: MeiosisCell<State> }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
    <div>
      <Conditions cell={cell.nest('conditions')} />
      <Temperature cell={cell.nest('temperature').nest('air')} />
      <Temperature cell={cell.nest('temperature').nest('water')} />
    </div>
    <pre style={{ margin: '0' }}>{JSON.stringify(cell.state, null, 4)}</pre>
  </div>
);

export const setupReactExample = (): void => {
  const cells = setup<State>({ stream: flyd, app });
  const element = document.getElementById('reactApp');
  cells.map((cell) => {
    ReactDOM.render(<AppView cell={cell} />, element);
  });
};
