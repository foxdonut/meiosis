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

const createNestPatch = produce => prop => patch => state => {
  state[prop] = produce(state[prop], patch);
};

/** type {import("./index").nest} */
export const nest = produce => createNest(createNestPatch(produce));

export const meiosisOne = ({ stream, produce, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });
