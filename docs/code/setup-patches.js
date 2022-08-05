/* global Meiosis */
const meiosisSetup = Meiosis.setup;

const cells = meiosisSetup();
console.log(cells().state);

// Function Patch
cells().update((state) => ({ ...state, counter: 1 }));
console.log(cells().state);

// Mergerino
cells().update({ counter: 2 });
console.log(cells().state);
