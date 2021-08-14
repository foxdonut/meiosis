// @ts-check

import { get } from "../util";

const baseSetup = ({ stream, accumulator, combine, app }) => {
  if (!stream) {
    throw new Error("No stream library was specified.");
  }
  if (!accumulator) {
    throw new Error("No accumulator function was specified.");
  }
  if (!combine) {
    throw new Error("No combine function was specified.");
  }

  const safeApp = app || {};
  const initial = safeApp.initial || {};
  const services = safeApp.services || [];

  const singlePatch = patch => (Array.isArray(patch) ? combine(patch) : patch);
  const accumulatorFn = (state, patch) => (patch ? accumulator(state, singlePatch(patch)) : state);

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update = createStream();

  const runServices = startingState =>
    services.reduce((state, service) => accumulatorFn(state, service(state)), startingState);

  const states = scan(
    (state, patch) => runServices(accumulatorFn(state, patch)),
    runServices(initial),
    update
  );

  return { states, update };
};

/** @type {import("./index").setup} */
const setup = ({ stream, accumulator, combine, app }) => {
  const { states, update } = baseSetup({ stream, accumulator, combine, app });

  const Actions = Object.assign({ Actions: (_update, _states) => undefined }, app).Actions;
  const Effects = Object.assign({ Effects: (_update, _actions) => [] }, app).Effects;

  const actions = Actions(update, states);
  const effects = Effects(update, actions);

  states.map(state => effects.forEach(effect => effect(state)));

  return { states, update, actions };
};

export default setup;

export const Nest = createNestPatchFunction => (prop, local = { path: [] }) => {
  const nestedPath = local.path.concat(prop);

  return {
    get: state => get(state, nestedPath),
    patch: createNestPatchFunction(nestedPath),
    path: nestedPath
  };
};

/** @type {import("./index").meiosisOne} */
export const meiosisOne = ({ stream, accumulator, combine, app, createNestPatchFunction }) => {
  const { states, update } = baseSetup({ stream, accumulator, combine, app });

  // const contextCache = {};

  /*
  const nest = root => propOrPath => {
    if (propOrPath) {
      const path = [].concat(propOrPath);

      if (!contextCache[path]) {
        const getState = () => get(states(), path);
        const nestPatch = createNestPatchFunction(path);
        const localUpdate = patch => update(nestPatch(patch));

        const localContext = {
          getState,
          update: localUpdate,
          nest: next => nest(root)(path.concat(next)),
          root
        };

        contextCache[path] = localContext;
      }
      return contextCache[path];
    }
    return root;
  };
  */

  const nest = (root, nested) => prop => {
    if (prop) {
      const getState = () => nested.getState()[prop];
      const nestPatch = createNestPatchFunction(prop);
      const nestedUpdate = patch => nested.update(nestPatch(patch));

      const nestedContext = {
        getState,
        update: nestedUpdate,
        root
      };

      nestedContext.nest = nextProp => nest(root, nestedContext)(nextProp);

      return nestedContext;
    }
    return root;
  };

  const baseRoot = {
    states,
    getState: () => states(),
    update
  };

  const root = Object.assign(baseRoot, {
    root: baseRoot,
    nest: nest(baseRoot, baseRoot)
  });

  return root;
};
