// @ts-check

import commonSetup, { meiosisOne as commonMeiosisOne } from "../common";

const pipe = fns => args => fns.reduce((arg, fn) => fn(arg), args);

/** @type {import("./index").functionPatchesSetup} */
const functionPatchesSetup = ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: pipe, app });

export default functionPatchesSetup;

// -------- Meiosis One

const createNestPatch = prop => patch => state =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });

export const meiosisOne = ({ stream, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: (x, f) => f(x),
    combine: pipe,
    app,
    createNestPatch
  });
