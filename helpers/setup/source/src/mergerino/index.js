// @ts-check

import commonSetup from "../common";

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("../common/index").NestPatch<any, any, any>}
 *
 * @param {import("./index").Patch<S[K]>} patch
 * @param {K} prop
 */
const nestPatch = (patch, prop) => ({ [prop]: patch });

/** @type {import("./index").setup} */
export const setup = ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    nestPatch,
    app
  });

export default setup;
