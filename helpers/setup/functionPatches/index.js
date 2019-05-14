import commonSetup from "../common";

const compose = fns => args => fns.reduceRight((arg, fn) => fn(arg), args);

/**
 * Helper to setup the Meiosis pattern.
 *
 * @async
 * @function meiosis.functionPatches.setup
 *
 * @param {StreamLib} stream - the stream library. This works with `meiosis.simpleStream`, `flyd`,
 * `m.stream`, or anything for which you provide either a function or an object with a `stream`
 * function to create a stream. The function or object must also have a `scan` property.
 * The returned stream must have a `map` method.
 * @param {app} app - the app, with optional properties.
 *
 * @returns {Promise} - a Promise that resolves to `{ update, models, states, actions }`
 * all of which are streams, except for `actions` which is the created actions.
 */
export default ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: compose, app });
