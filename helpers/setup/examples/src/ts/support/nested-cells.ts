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

// Uncomment the next line and pass an emptry string to nest().
// Press Ctrl+Space and notice that auto-suggest indicates valid properties,
// and that specifying an invalid property results in an error.
// Specify 'phone' to create a nested cell.
// const nestedCell = cell.nest();

// Enter a dot (.) after state and notice that auto-suggest
// indicates 'home' and 'work'.
// nestedCell.state;

// Enter an empty object {} within update() and press Ctrl+Space.
// Notice that auto-suggest nested properties of `phone`.
// nestedCell.update();
