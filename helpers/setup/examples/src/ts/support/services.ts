import { meiosisSetup } from 'meiosis-setup';
import { MeiosisComponent, Service } from 'meiosis-setup/types';

interface State {
  name: string;
  age: number;
}

const service: Service<State> = {
  onchange: (state) => state.age,
  run: (cell) => {
    cell.update({ age: (value) => value + 1 });
  }
};

const app: MeiosisComponent<State> = {
  services: [service]
};

const cells = meiosisSetup<State>({ app });
cells;
