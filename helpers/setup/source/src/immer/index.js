// @ts-check

import commonSetup, { createNest, cell as commonCell } from "../common";

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
 * @template S
 * @template {keyof S} K
 *
 * @type {import("./index").ProduceNestPatch}
 */
const nestPatch = produce => (patch, prop) => state => {
  state[prop] = produce(state[prop], patch);
};

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("./index").ProduceNest<S, K>}
 */
export const nest = produce => createNest(nestPatch(produce));

/** @type {import("./index").cell} */
export const cell = ({ stream, produce, app }) =>
  commonCell({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });
