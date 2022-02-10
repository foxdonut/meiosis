// @ts-check

import commonSetup from "../common";

const pipe = fns => args => fns.reduce((arg, fn) => fn(arg), args);

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("../common/index").NestPatch}
 *
 * @param {import("./index").Patch<S[K]>} patch
 * @param {K} prop
 */
const nestPatch = (patch, prop) => state =>
  Object.assign({}, state, { [prop]: patch(state[prop]) });

/** @type {import("./index").setup} */
export const setup = ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: pipe, nestPatch, app });

export default setup;
