// @ts-check

import commonSetup, { meiosisOne as commonMeiosisOne, Nest } from "../common";

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

const createNestPatchFunction = produce => prop => patch => state => {
  state[prop] = produce(state[prop], patch);
};

export const nest = produce => Nest(createNestPatchFunction(produce));

export const meiosisOne = ({ stream, produce, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app,
    createNestPatchFunction: createNestPatchFunction(produce)
  });
