import { meiosisSetup } from 'meiosis-setup';

interface State {
  name: string;
  age: number;
  phone: {
    home: string;
    work: string;
  }
}

const cells = meiosisSetup<State>();
const cell = cells();
cell;

// Uncomment the next line and pass a string to nest().
// Notice that auto-suggest indicates valid properties,
// and that specifying an invalid property results in an error.
// Specify 'phone' to create a nested cell.
// const nestedCell = cell.nest();

// Enter a dot (.) after state and notice that auto-suggest
// indicates 'home' and 'work'.
// nestedCell.state;

// Enter an empty object {} within update(), notice that auto-suggest
// indicates 'home' and 'work'.
// nestedCell.update();
