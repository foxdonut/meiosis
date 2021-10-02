// @ts-check

import commonSetup, { createNest, meiosisOne as commonMeiosisOne } from "../common";

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

// -------- Meiosis One

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
 * @template A
 *
 * @type {import("./index").ProduceNest<S, K, A>}
 */
export const nest = produce => createNest(nestPatch(produce));

export const meiosisOne = ({ stream, produce, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });
