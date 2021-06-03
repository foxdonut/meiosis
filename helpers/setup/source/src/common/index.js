// @ts-check

import { get } from "../util";

const setup = ({ stream, accumulator, combine, app }) => {
  if (!stream) {
    throw new Error("No stream library was specified.");
  }
  if (!accumulator) {
    throw new Error("No accumulator function was specified.");
  }
  if (!combine) {
    throw new Error("No combine function was specified.");
  }

  app = Object.assign({ initial: {}, Actions: () => ({}), services: [], Effects: () => [] }, app);

  const singlePatch = patch => (Array.isArray(patch) ? combine(patch) : patch);
  const accumulatorFn = (state, patch) => (patch ? accumulator(state, singlePatch(patch)) : state);

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update = createStream();

  const runServices = startingState =>
    app.services.reduce((state, service) => accumulatorFn(state, service(state)), startingState);

  const states = scan(
    (state, patch) => runServices(accumulatorFn(state, patch)),
    runServices(app.initial),
    update
  );

  const actions = app.Actions(update, states);
  const effects = app.Effects(update, actions);

  states.map(state => effects.forEach(effect => effect(state)));

  return { states, update, actions };
};

export default setup;

/*
 * Base helper to setup the Meiosis pattern. If you are using Mergerino, Function Patches, or Immer,
 * use their respective `setup` function instead.
 *
 * Patch is merged in to the state by default. Services have access to the state and can return a
 * patch that further updates the state. State changes by services are available to the next
 * services in the list.
 *
 * After the services have run and the state has been updated, effects are executed and have the
 * opportunity to trigger more updates.
 *
 * @template S, P, A
 * @function meiosis.common.setup
 *
 * param {MeiosisOneConfig<S, P, A>} config the Meiosis config FIXME
 *
 * @returns {MeiosisOne<S, P, A>} FIXME
 */
/*
export const setupOne = ({ stream, accumulator, combine, app, nestUpdate }) => {
  const { states, update, actions } = setup({ stream, accumulator, combine, app });

  const select = prop => {
    const sub = states.map(state => state[prop]);

    Object.assign(sub, {
      update: nestUpdate(update, prop),
      actions: actions ? actions[prop] : undefined
    });

    return sub;
  };

  return Object.assign(states, { update, actions, select });
};
*/

/**
 * The `path` is stored on the local object for internal use.
 *
 * @typedef {Object} LocalPath
 *
 * @property {string[]} path
 */

/**
 * Function that nests a patch `P2`
 *
 * @template P2, P1
 * @callback NestPatchFunction
 *
 * @param {P2} patch the nested patch
 *
 * @return {P1} the top-level patch with `P2` nested within
 */

/**
 * A local object with a `patch` function to create a nested patch.
 *
 * @template P1, P2
 * @typedef {Object} LocalPatch
 *
 * @property {NestPatchFunction<P2, P1>} patch
 */

/**
 * Function to get the local state from the global state.
 *
 * @template S1, P1, S2, P2
 * @typedef {LocalPath & LocalPatch<P1, P2>} Local
 *
 * @property {function(S1): S2} get
 */

/**
 * Function that creates a local object from the specified nest path and, optionally, another
 * local object.
 *
 * @template S1, P1, S2, P2
 * @callback NestFunction
 *
 * @param {string|string[]} path
 * @param {LocalPath} [local]
 *
 * @return {Local<S1, P1, S2, P2>}
 */

/**
 * Constructor to create a `nest` function.
 *
 * @template S1, P1, S2, P2
 * @param {function(string[]): NestPatchFunction<P2, P1>} createNestPatchFunction
 *
 * @return {NestFunction<S1, P1, S2, P2>}
 */
export const Nest = createNestPatchFunction => (path, local = { path: [] }) => {
  const nestedPath = local.path.concat(path);

  return {
    get: state => get(state, nestedPath),
    patch: createNestPatchFunction(nestedPath),
    path: nestedPath
  };
};
