import { setup as commonSetup } from "../common/setup";

/**
 * Helper to setup the Meiosis pattern.
 *
 * @async
 * @function meiosis.patchinko.setup
 *
 * @param {StreamLib} stream - the stream library. This works with `meiosis.simpleStream`, `flyd`,
 * `m.stream`, or anything for which you provide either a function or an object with a `stream`
 * function to create a stream. The function or object must also have a `scan` property.
 * The returned stream must have a `map` method.
 * @param {Function} produce - the Immer `produce` function.
 * @param {Object} app - the app, with the optional properties below.
 * @param {Function} [app.Initial=()=>({})] -  a function that creates the initial state.
 * This function can return a result or a Promise. If not specified, the initial state will
 * be `{}`.
 * @param {Function} [app.Actions=()=>({})] - a function that creates actions, of the form
 * `update => actions`.
 * @param {Array<Function>} [app.acceptors=[]] - an array of acceptor functions, each of which
 * should be `state => patch`.
 * @param {Array<Function>} [app.services=[]] - an array of service functions, each of which
 * should be `({ state, update, actions }) => void`.
 *
 * @returns {Promise} - a Promise that resolves to `{ update, models, states, actions }`
 * all of which are streams, except for `actions` which is the created actions.
 */
export const setup = ({ stream, produce, app }) =>
  commonSetup({
    stream,
    accumulator: produce,
    combine: patches => model => {
      patches.forEach(patch => patch(model));
    },
    app
  });
