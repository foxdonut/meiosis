// @ts-check

import commonSetup, { meiosisOne as commonMeiosisOne, Nest } from "../common";
import { get, setImmutable } from "../util";

const pipe = fns => args => fns.reduce((arg, fn) => fn(arg), args);

/** @type {import("./index").functionPatchesSetup} */
const functionPatchesSetup = ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: pipe, app });

export default functionPatchesSetup;

const createNestPatchFunction = path => patch => state =>
  setImmutable(state, path, patch(get(state, path)));

export const nest = Nest(createNestPatchFunction);

export const meiosisOne = ({ stream, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: (x, f) => f(x),
    combine: pipe,
    app,
    createNestPatchFunction
  });
