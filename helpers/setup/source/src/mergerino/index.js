// @ts-check

import commonSetup, { createNest, meiosisOne as commonMeiosisOne } from "../common";

/*
 * @template S
 *
 * @typedef {import("./index").MergerinoPatch<S>} MergerinoPatch
 */

/*
 * @template S
 * @template K
 * @template N
 * @template P
 *
 * @typedef {import("../common/index").NestPatch<S, K, N, P>} NestPatch
 */

/** @type {import("./index").mergerinoSetup} */
const mergerinoSetup = ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });

export default mergerinoSetup;

// -------- Meiosis One

/**
 * @template S
 * @template {keyof S} K
 *
 * @type {import("../common/index").NestPatch}
 *
 * @param {import("./index").MergerinoPatch<S[K]>} patch
 * @param {K} prop
 */
const nestPatch = (patch, prop) => ({ [prop]: patch });

/**
 * @template S
 * @template {keyof S} K
 * @template A
 *
 * @type {import("./index").MergerinoNest<S, K, A>}
 */
export const nest = createNest(nestPatch);

/** @type {import("./index").meiosisOne} */
export const meiosisOne = ({ stream, merge, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });
