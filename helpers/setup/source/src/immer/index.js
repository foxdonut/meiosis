// @ts-check

import commonSetup, { createNest, cell as commonCell } from "../common";

/** @type {import("./index").immerSetup} */
const immerSetup = ({ stream, produce, app }) =>
  commonSetup({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });

export default immerSetup;

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

export const meiosisCell = ({ stream, produce, app }) =>
  commonCell({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });
