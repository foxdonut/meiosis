// @ts-check

import commonSetup, { Nest } from "../common";
import { get, setImmutable } from "../util";

const pipe = fns => args => fns.reduce((arg, fn) => fn(arg), args);

/**
 * @template S
 * @typedef {import("./index").FunctionPatch<S>} FunctionPatch
 */

/**
 * @template S, A
 * @typedef {Object} MeiosisFunctionPatchesConfig
 *
 * @property {import("../common").StreamLib} stream the stream library. This works with
 * `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for which you provide either a function
 * or an object with a `stream` function to create a stream. The function or object must also have a
 * `scan` property. The returned stream must have a `map` method.
 * @property {import("../common").App<S, FunctionPatch<S>, A>} app the app, with optional
 * properties.
 */

/**
 * Helper to setup the Meiosis pattern with function patches.
 *
 * @template S, A
 * @function meiosis.functionPatches.setup
 *
 * @param {MeiosisFunctionPatchesConfig<S, A>} config the Meiosis config for use with Function
 * Patches
 *
 * @returns {import("../common").Meiosis<S, FunctionPatch<S>, A>} `{ states, update, actions }`,
 * where `states` and `update` are streams, and `actions` are the created actions.
 */

/** @type {import("./index")._default} */
export default ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: pipe, app });

export const nest = Nest(path => patch => state =>
  setImmutable(state, path, patch(get(state, path)))
);
