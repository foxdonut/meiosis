import { stream, scan } from '../../../source/dist/simple-stream';

// simple-stream
(() => {
  const s1 = stream<number>(0);
  const s2 = scan<number, number>((x, y) => x + y, 0, s1);
  s2.map((x) => x);
})();

// common code
export interface DomEvent {
  target: {
    checked: boolean;
    value: string;
  };
}

export type Sky = 'SUNNY' | 'CLOUDY' | 'MIX';

export interface Condition {
  precipitations: boolean;
  sky: Sky;
}

export type TemperatureUnits = 'C' | 'F';

export interface TemperatureState {
  label: string;
  value: number;
  units: TemperatureUnits;
}

export interface State {
  conditions: Condition;
  airTemperature: TemperatureState;
  waterTemperature: TemperatureState;
}

export const convert = (value: number, to: TemperatureUnits): number => {
  return Math.round(to === 'C' ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32);
};

export const InitialTemperature = (label: string): TemperatureState => ({
  label,
  value: 22,
  units: 'C'
});
