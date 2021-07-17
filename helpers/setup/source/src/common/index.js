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

export const Nest = createNestPatchFunction => (path, local = { path: [] }) => {
  const nestedPath = local.path.concat(path);

  return {
    get: state => get(state, nestedPath),
    patch: createNestPatchFunction(nestedPath),
    path: nestedPath
  };
};

export const meiosisOne = ({ stream, accumulator, combine, app, createNestPatchFunction }) => {
  const { states, update } = setup({ stream, accumulator, combine, app });

  const meiosisCache = {};

  const meiosis = {
    states,
    getState: () => states(),
    update
  };

  const attachActionsTo = meiosis => {
    if (app.Actions) {
      const actions = app.Actions(meiosis);
      meiosis.actions = actions;
    }
  };

  attachActionsTo(meiosis);

  const nest = propOrPath => {
    if (propOrPath) {
      const path = [].concat(propOrPath);

      if (!meiosisCache[path]) {
        const getState = () => get(states(), path);
        const nestPatch = createNestPatchFunction(path);
        const localUpdate = patch => update(nestPatch(patch));

        const localMeiosis = {
          getState,
          update: localUpdate,
          nest: next => nest(path.concat(next)),
          root: meiosis
        };

        attachActionsTo(localMeiosis);

        meiosisCache[path] = localMeiosis;
      }
      return meiosisCache[path];
    }
    return meiosis;
  };

  meiosis.nest = nest;

  return meiosis;
};
