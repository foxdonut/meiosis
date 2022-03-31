// react + functionPatches + flyd
import { App, MeiosisCell, setup } from '../../source/dist/functionPatches';
import flyd from 'flyd';
import React from 'react';
import ReactDOM from 'react-dom';
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
      onChange={(evt: DomEvent) => conditionsActions.changeSky(cell, evt.target.value as Sky)}
    />
    {label}
  </label>
);

const conditions: App<Condition> = {
  initial: {
    precipitations: false,
    sky: 'SUNNY'
  },

  view: (cell: MeiosisCell<Condition>) => (
    <div>
      <label>
        <input
          type="checkbox"
          checked={cell.state.precipitations}
          onChange={(evt: DomEvent) =>
            conditionsActions.togglePrecipitations(cell, evt.target.checked)
          }
        />
        Precipitations
      </label>
      <div>
        <SkyOption cell={cell} value="SUNNY" label="Sunny" />
        <SkyOption cell={cell} value="CLOUDY" label="Cloudy" />
        <SkyOption cell={cell} value="MIX" label="Mix of sun/clouds" />
      </div>
    </div>
  )
};

const temperatureActions = {
  increment: (cell: MeiosisCell<TemperatureState>, amount: number) => {
    cell.update((state) => ({
      ...state,
      value: state.value + amount
    }));
  },
  changeUnits: (cell: MeiosisCell<TemperatureState>) => {
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

const createTemperature = (label: string) => ({
  initial: InitialTemperature(label),
  view: (cell: MeiosisCell<TemperatureState>) => (
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
  )
});

const app: App<State> = {
  nested: {
    conditions,
    airTemperature: createTemperature('Air'),
    waterTemperature: createTemperature('Water')
  }
};

const AppView = ({ cell }: { cell: MeiosisCell<State> }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
    <div>
      {cell.nested.conditions.view(cell)}
      {cell.nested.airTemperature.view(cell)}
      {cell.nested.waterTemperature.view(cell)}
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
