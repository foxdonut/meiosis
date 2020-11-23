// @ts-check

import commonSetup, { Nest } from "../common";
import { setMutate } from "../util";

/**
 * @template S, P, A
 * @typedef {Object} MeiosisMergerinoConfig
 *
 * @property {import("../common").StreamLib} stream the stream library. This works with
 * `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for which you provide either a function
 * or an object with a `stream` function to create a stream. The function or object must also have a
 * `scan` property. The returned stream must have a `map` method.
 * @property {function(S, P): S} merge the Mergerino `merge` function.
 * @property {import("../common").App<S, P, A>} app the app, with optional properties.
 */

/**
 * Helper to setup the Meiosis pattern with [Mergerino](https://github.com/fuzetsu/mergerino).
 *
 * @template S, P, A
 * @function meiosis.mergerino.setup
 *
 * @param {MeiosisMergerinoConfig<S, P, A>} config the Meiosis config for use with Mergerino
 *
 * @returns {import("../common").Meiosis<S, P, A>} `{ states, update, actions }`, where
 * `states` and `update` are streams, and `actions` are the created actions.
 */
export default ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });

export const nest = Nest(path => patch => setMutate({}, path, patch));
