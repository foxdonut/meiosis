// @ts-check

import commonSetup, { createNest, meiosisOne as commonMeiosisOne } from "../common";

const pipe = fns => args => fns.reduce((arg, fn) => fn(arg), args);

/** @type {import("./index").functionPatchesSetup} */
const functionPatchesSetup = ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: pipe, app });

export default functionPatchesSetup;

// -------- Meiosis One

const createNestPatch = prop => patch => state =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });

/** type {import("./index").nest} */
export const nest = createNest(createNestPatch);

export const meiosisOne = ({ stream, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: (x, f) => f(x),
    combine: pipe,
    app
  });
