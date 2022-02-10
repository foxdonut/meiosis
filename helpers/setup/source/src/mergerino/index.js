// @ts-check

import commonSetup, { createNest } from "../common";

/** @type {import("./index").setup} */
export const setup = ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });

export default setup;

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("../common/index").NestPatch}
 *
 * @param {import("./index").Patch<S[K]>} patch
 * @param {K} prop
 */
const nestPatch = (patch, prop) => ({ [prop]: patch });

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("./index").Nest<S, K>}
 */
export const nest = createNest(nestPatch);
