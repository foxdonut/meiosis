import { meiosisSetup } from 'meiosis-setup';

interface State {
  name: string;
  age: number;
}

const cells = meiosisSetup<State>();
const cell = cells();

// Add a dot (.) after cell and see auto-suggested cell properties
cell;

// Add a dot (.) after state and see auto-suggested state properties
cell.state;

cell.update({ name: 'Meiosis' });

// uncomment and see the patch in error since 'invalid' is not a property of State
// cell.update({ invalid: true });

// uncomment and see the patch in error since 'not valid' is not a number
// cell.update({ age: 'not valid'});
