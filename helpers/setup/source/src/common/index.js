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

// -------- Meiosis Cell

/** @type {import("./index").createNest} */
export const createNest = nestPatch => (cell, prop, Actions) => {
  const getState = cell.getState.map(state => state[prop]);

  /** @type {import("./index").MeiosisCell} */
  const nested = {
    getState,
    update: patch => cell.update(nestPatch(patch, prop)),
    actions: null
  };

  if (Actions) {
    nested.actions = Actions(nested);
  }

  return nested;
};

/** @type {import("./index").setupCell} */
export const setupCell = ({ stream, accumulator, combine, app }) => {
  const { states, update } = baseSetup({ stream, accumulator, combine, app });

  const root = {
    getState: states,
    update,
    actions: undefined
  };

  const actions = app && app.Actions ? app.Actions(root) : undefined;

  return {
    getState: root.getState,
    update: root.update,
    actions
  };
};
