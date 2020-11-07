// @ts-check

import commonSetup, { Nest } from "../common";
import { get, setMutate } from "../util";

/**
 * @template S
 * @callback ImmerPatch
 *
 * @param {S} state current state
 *
 * @return {S | void}
 */

/**
 * @template S, A
 * @typedef {Object} MeiosisImmerConfig
 *
 * @property {import("../common").StreamLib} stream the stream library. This works with
 * `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for which you provide either a function
 * or an object with a `stream` function to create a stream. The function or object must also have a
 * `scan` property. The returned stream must have a `map` method.
 * @property {function(S, ImmerPatch<S>): S} produce the Immer `produce` function.
 * @property {import("../common").App<S, ImmerPatch<S>, A>} app the app, with optional properties.
 */

/**
 * Helper to setup the Meiosis pattern with [Immer](https://github.com/immerjs/immer).
 *
 * @template S, A
 * @function meiosis.immer.setup
 *
 * @param {MeiosisImmerConfig<S, A>} config the Meiosis config for use with Mergerino
 *
 * @returns {import("../common").Meiosis<S, ImmerPatch<S>, A>} meiosis
 * `{ states, update, actions }`, where `states` and `update` are streams, and `actions` are the
 * created actions.
 */
export default ({ stream, produce, app }) =>
  commonSetup({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });

export const nest = produce =>
  Nest(path => patch => state => {
    setMutate(state, path, produce(get(state, path), patch));
  });
