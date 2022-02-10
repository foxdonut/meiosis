// @ts-check

/** @type {import("./index").setup} */
export const setup = ({ stream, accumulator, combine, app }) => {
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

  const getState = scan(
    (state, patch) => runServices(accumulatorFn(state, patch)),
    runServices(initial),
    update
  );

  /** @type {import("./index").Meiosis} */
  const cell = {
    getState,
    update,
    actions: undefined,
    root: undefined
  };

  const actions = safeApp.Actions ? safeApp.Actions(cell) : undefined;

  cell.actions = actions;
  cell.root = cell;

  const effects = Object.assign({ effects: [] }, app).effects;
  getState.map(() => effects.forEach(effect => effect(cell)));

  return cell;
};

export default setup;

/** @type {import("./index").createNest} */
export const createNest = nestPatch => (cell, prop) => {
  const getState = cell.getState.map(state => state[prop]);

  /** @type {import("./index").Meiosis} */
  const nested = {
    getState,
    update: patch => cell.update(nestPatch(patch, prop)),
    actions: null,
    root: cell.root
  };

  return nested;
};
