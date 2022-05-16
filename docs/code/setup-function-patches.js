/* global Meiosis */
const meiosisSetup = Meiosis.functionPatches.setup;

const cells = meiosisSetup();
console.log(cells().state);

cells().update((state) => ({ ...state, counter: 1 }));
console.log(cells().state);