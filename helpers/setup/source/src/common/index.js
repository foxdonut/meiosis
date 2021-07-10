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

export const meiosisOne = ({ stream, merge, app }) => {
  const update = stream()

  const states = stream.scan((state, patch) => merge(state, patch), app.initial, update)

  const pathGet = (object, path) =>
    path.reduce((obj, key) => (obj == undefined ? undefined : obj[key]), object)

  const nestPatch = (path, value) => ({
    [path[0]]: path.length === 1 ? value : nestPatch(path.slice(1), value)
  })

  const contextCache = {}

  const root = {
    getState: () => states(),
    update
  }

  // actions should be optional
  const actions = app.Actions(root)
  root.actions = actions

  const nest = propOrPath => {
    if (propOrPath) {
      const path = [].concat(propOrPath)

      if (!contextCache[path]) {
        const getState = () => pathGet(states(), path)
        const localUpdate = patch => update(nestPatch(path, patch))

        const localContext = {
          getState,
          update: localUpdate,
          nest: next => nest(path.concat(next)),
          root
        }
        const localActions = app.Actions(localContext)
        localContext.actions = localActions

        contextCache[path] = localContext
      }
      return contextCache[path]
    }
    return root
  }

  root.nest = nest

  return { states, context: root }
}

*/

export const Nest = createNestPatchFunction => (path, local = { path: [] }) => {
  const nestedPath = local.path.concat(path);

  return {
    get: state => get(state, nestedPath),
    patch: createNestPatchFunction(nestedPath),
    path: nestedPath
  };
};
