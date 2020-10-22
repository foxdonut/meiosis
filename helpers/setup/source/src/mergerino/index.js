// @ts-check

/**
 * @typedef {*} MergerinoPatch
 */

import commonSetup from "../common";

/**
 * @template S, A
 * @typedef {Object} MeiosisMergerinoConfig
 *
 * @property {import("../common").StreamLib} stream the stream library. This works with
 * `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for which you provide either a function
 * or an object with a `stream` function to create a stream. The function or object must also have a
 * `scan` property. The returned stream must have a `map` method.
 * @property {function(S, MergerinoPatch): S} merge the Mergerino `merge` function.
 * @property {import("../common").App<S, MergerinoPatch, A>} app the app, with optional properties.
 */

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S, A
 * @function meiosis.mergerino.setup
 *
 * @param {MeiosisMergerinoConfig<S, A>} config the Meiosis config for use with Mergerino
 *
 * @returns {import("../common").Meiosis<S, MergerinoPatch, A>} `{ states, update, actions }`, where
 * `states` and `update` are streams, and `actions` are the created actions.
 */
export default ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });
