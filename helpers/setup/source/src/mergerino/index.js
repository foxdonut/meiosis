// @ts-check

import commonSetup, { createNest, cell as commonCell } from "../common";

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

/** @type {import("./index").setup} */
const setup = ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });

export default setup;

// -------- Meiosis Cell

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
 *
 * @type {import("./index").MergerinoNest<S, K>}
 */
export const nest = createNest(nestPatch);

/** @type {import("./index").cell} */
export const cell = ({ stream, merge, app }) =>
  commonCell({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });
