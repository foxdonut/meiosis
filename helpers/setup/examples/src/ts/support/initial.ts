import { meiosisSetup } from 'meiosis-setup';
import { MeiosisComponent } from 'meiosis-setup/types';

interface State {
  name: string;
  age: number;
}

const app: MeiosisComponent<State> = {
  initial: {
    age: 25
  }
};

const cells = meiosisSetup<State>({ app });
cells;
