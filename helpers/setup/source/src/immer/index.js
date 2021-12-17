// @ts-check

import commonSetup, { createNest, setupCell as commonCell } from "../common";

/** @type {import("./index").setup} */
const setup = ({ stream, produce, app }) =>
  commonSetup({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });

export default setup;

// -------- Meiosis Cell

/**
 * @type {import("./index").ProduceNestPatch}
 */
const produceNestPatch = produce => (patch, prop) => state => {
  state[prop] = produce(state[prop], patch);
};

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("./index").ProduceNest<S, K>}
 */
export const produceNest = produce => createNest(produceNestPatch(produce));

/** @type {import("./index").setupCell} */
export const setupCell = ({ stream, produce, app }) =>
  commonCell({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });
