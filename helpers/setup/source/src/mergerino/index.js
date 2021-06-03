// @ts-check

import commonSetup, { Nest } from "../common";
// import commonSetup, { setupOne as commonSetupOne, Nest } from "../common";
import { setMutate } from "../util";

// const compose = (f, g) => x => f(g(x));

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

/** @type {import("./index").mergerinoSetup} */
const mergerinoSetup = ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });

export default mergerinoSetup;

/*
const createNestPatch = prop => patch => ({ [prop]: patch });
const nestUpdate = (update, prop) => compose(update, createNestPatch(prop));

export const setupOne = ({ stream, merge, app }) =>
  commonSetupOne({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app,
    nestUpdate
  });
*/

export const nest = Nest(path => patch => setMutate({}, path, patch));
