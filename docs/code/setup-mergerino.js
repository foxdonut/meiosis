/* global Meiosis */
const meiosisSetup = Meiosis.mergerino.setup;

const cells = meiosisSetup();
console.log(cells().state);

cells().update({ counter: 1 });
console.log(cells().state);