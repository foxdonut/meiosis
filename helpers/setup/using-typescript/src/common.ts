import { stream, scan } from "../../source/dist/simple-stream";

// simple-stream
(() => {
  const s1 = stream<number>(0);
  const s2 = scan<number, number>((x, y) => x + y, 0, s1);
  s2.map(x => x);
})();

// common code
export type Sky = "SUNNY" | "CLOUDY" | "MIX";

export interface Conditions {
  precipitations: boolean;
  sky: Sky;
}

export type TemperatureUnits = "C" | "F";

export interface Temperature {
  label: string;
  value: number;
  units: TemperatureUnits;
}

export interface TemperatureComponent {
  Initial: (label: string) => Temperature;
}

export interface State {
  conditions: Conditions;
  temperature: {
    air: Temperature;
    water: Temperature;
  };
}

export interface ConditionsComponent {
  initial: Conditions;
}

export const initialConditions: Conditions = {
  precipitations: false,
  sky: "SUNNY"
};

export const convert = (value: number, to: TemperatureUnits): number => {
  return Math.round(to === "C" ? ((value - 32) / 9) * 5 : (value * 9) / 5 + 32);
};

export const InitialTemperature = (label: string): Temperature => ({
  label,
  value: 22,
  units: "C"
});
