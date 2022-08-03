import { meiosisSetup } from 'meiosis-setup';

interface State {
  name: string;
  age: number;
}

const cells = meiosisSetup<State>();
const cell = cells();

cell.state.name;

cell.update({ name: 'Meiosis' });
cell.update({ invalid: true });
cell.update({ age: 'not valid '});
