// @ts-check

import commonSetup, { meiosisOne as commonMeiosisOne, Nest } from "../common";

const pipe = fns => args => fns.reduce((arg, fn) => fn(arg), args);

/** @type {import("./index").functionPatchesSetup} */
const functionPatchesSetup = ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: pipe, app });

export default functionPatchesSetup;

const createNestPatchFunction = prop => patch => state =>
  Object.assign({}, state, { prop: patch(state[prop]) }); // FIXME: test this, should be [prop]

export const nest = Nest(createNestPatchFunction);

export const meiosisOne = ({ stream, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: (x, f) => f(x),
    combine: pipe,
    app,
    createNestPatchFunction
  });
