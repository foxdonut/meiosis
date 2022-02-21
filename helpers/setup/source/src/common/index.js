// @ts-check

/** @type {import("./index").toStream} */
export const toStream = Stream => {
  const streamFn = Stream.stream || Stream;

  return {
    stream: value => streamFn(value),
    scan: (acc, init, stream) => Stream.scan(acc, init, stream)
  };
};

/** @type {import("./index").setup} */
export const setup = ({ stream, accumulator, combine, nestPatch, app }) => {
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

  /** @type {import("./index").MeiosisContext} */
  const context = {
    getState: () => states(),
    update,
    actions: undefined
  };

  const actions = safeApp.Actions ? safeApp.Actions(context) : undefined;
  context.actions = actions;

  const cell = {
    state: states(),
    update,
    actions,
    root: undefined,
    nest: undefined
  };

  /** @type {import("./index").nestCell} */
  const nestCell = (nestPatch, cell, getState) => prop => {
    const getNestedState = () => getState()[prop];

    /** @type {import("./index").MeiosisCell} */
    const nested = {
      state: getNestedState(),
      update: patch => cell.update(nestPatch(patch, prop)),
      actions: undefined,
      root: cell.root,
      nest: undefined
    };

    nested.nest = nestCell(nestPatch, nested, getNestedState);

    return nested;
  };

  cell.nest = nestCell(nestPatch, cell, states);

  const effects = Object.assign({ effects: [] }, app).effects;
  states.map(state => effects.forEach(effect => effect(Object.assign(cell, { state }))));

  return {
    states,
    cell
  };
};

export default setup;
