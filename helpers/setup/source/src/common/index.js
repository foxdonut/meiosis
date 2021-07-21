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

  const contextCache = {};

  const root = {
    states,
    getState: () => states(),
    update
  };

  const attachActionsTo = context => {
    if (app.Actions) {
      context.actions = app.Actions(context);
    }
  };

  attachActionsTo(root);

  const nest = propOrPath => {
    if (propOrPath) {
      const path = [].concat(propOrPath);

      if (!contextCache[path]) {
        const getState = () => get(states(), path);
        const nestPatch = createNestPatchFunction(path);
        const localUpdate = patch => update(nestPatch(patch));

        const localContext = {
          getState,
          update: localUpdate,
          nest: next => nest(path.concat(next)),
          root
        };

        attachActionsTo(localContext);

        contextCache[path] = localContext;
      }
      return contextCache[path];
    }
    return root;
  };

  root.nest = nest;
  root.root = root;

  return root;
};
