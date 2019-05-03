import { setup as commonSetup } from "../common/setup";

/**
 * Helper to setup the Meiosis pattern.
 *
 * @param {stream} the stream library. This works with either `flyd`, `m.stream`, or anything
 * for which you provide either a function or an object with a `stream` function to create a stream.
 * The function or object must also have a `scan` property.
 * The returned stream must have a `map` method.
 * @param {O} the Patchinko function
 * @param {app.initial} (optional) a function that creates the initial state. This function can return
 * a result * or a Promise. If not specified, the initial state will be `{}`.
 * @param {app.Actions} (optional) a function that creates actions, of the form `update => actions`.
 * @param {app.acceptors} (optional) an array of `accept` functions, each of which should be
 * `state => patch`.
 * @param {app.services} (optional) an array of `service` functions, each of which should be
 * `({ state, update, actions }) => void`.
 *
 * @returns a Promise that resolves to { update, models, accepted, states, actions }
 * all of which are streams, except for `actions` which is the created actions.
 */
export const setup = ({ stream, O, app }) =>
  commonSetup({
    stream,
    accumulator: (model, patch) => {
      if (typeof patch === "function") {
        return patch(model);
      } else {
        return O(model, patch);
      }
    },
    // Can't use patches.reduce(O, model) because O would get called as O(model, patch, index)
    combinator: patches => model => patches.reduce((m, p) => O(m, p), model),
    app
  });
