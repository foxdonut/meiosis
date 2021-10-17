// @ts-check

import commonSetup, { createNest, meiosisOne as commonMeiosisOne } from "../common";

const pipe = fns => args => fns.reduce((arg, fn) => fn(arg), args);

/** @type {import("./index").functionPatchesSetup} */
const functionPatchesSetup = ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: pipe, app });

export default functionPatchesSetup;

// -------- Meiosis One

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("../common/index").NestPatch}
 *
 * @param {import("./index").FunctionPatch<S[K]>} patch
 * @param {K} prop
 */
const nestPatch = (patch, prop) => state =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("./index").FunctionPatchesNest<S, K>}
 */
export const nest = createNest(nestPatch);

/** @type {import("./index").meiosisOne} */
export const meiosisOne = ({ stream, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: (x, f) => f(x),
    combine: pipe,
    app
  });
