import { meiosisSetup } from 'meiosis-setup';
import { MeiosisComponent, Service } from 'meiosis-setup/types';

interface State {
  name: string;
  age: number;
  status: string;
}

const service: Service<State> = {
  onchange: (state) => state.age,
  run: (cell) => {
    cell.update({ status: cell.state.age >= 21 ? 'adult' : 'minor' });
  }
};

const app: MeiosisComponent<State> = {
  services: [service]
};

const cells = meiosisSetup<State>({ app });
cells;
