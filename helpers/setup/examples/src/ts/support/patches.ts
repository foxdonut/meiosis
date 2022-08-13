import { meiosisSetup } from 'meiosis-setup';

interface State {
  name: string;
  age: number;
}

const cells = meiosisSetup<State>();

console.log(cells().state);

// Function Patch
cells().update((state) => ({ ...state, age: 21 }));
console.log(cells().state);

// Mergerino
cells().update({ age: 24 });
console.log(cells().state);
