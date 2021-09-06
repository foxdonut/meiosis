// @ts-check

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

/** type {import("./index").meiosisOne} */
export const meiosisOne = ({ stream, accumulator, combine, app, createNestPatch }) => {
  const { states, update, actions } = baseSetup({ stream, accumulator, combine, app });

  const root = {
    getState: states,
    update,
    actions
  };

  const nest = (prop, Actions, parentState = states, parentPatch = createNestPatch(prop)) => {
    const getState = () => parentState()[prop];
    const nestPatch = patch => parentPatch(patch);

    const nested = {
      root,
      getState,
      update: patch => update(nestPatch(patch)),
      nest: (nextProp, Actions) =>
        nest(nextProp, Actions, getState, patch => parentPatch(createNestPatch(nextProp)(patch)))
    };

    nested.actions = Actions ? Actions(nested) : undefined;

    return nested;
  };

  root.nest = nest;

  return root;
};
