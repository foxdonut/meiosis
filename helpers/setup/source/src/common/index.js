// @ts-check

/** @type {import("./index").toStream} */
export const toStream = Stream => ({
  stream: value => Stream(value),
  scan: (acc, init, stream) => Stream.scan(acc, init, stream)
});

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

  const getState = scan(
    (state, patch) => runServices(accumulatorFn(state, patch)),
    runServices(initial),
    update
  );

  /** @type {import("./index").MeiosisContext} */
  const context = {
    getState,
    update,
    actions: undefined
  };

  const actions = safeApp.Actions ? safeApp.Actions(context) : undefined;

  context.actions = actions;

  /** @type {import("./index").nestCell} */
  const nestCell = (nestPatch, cell) => prop => {
    const state = cell.state[prop];

    /** @type {import("./index").MeiosisCell} */
    const nested = {
      state,
      update: patch => cell.update(nestPatch(patch, prop)),
      actions: undefined,
      root: cell.root,
      nest: undefined
    };

    nested.nest = nestCell(nestPatch, nested);

    return nested;
  };

  const cells = getState.map(state => {
    const cell = {
      state,
      update,
      actions,
      root: undefined,
      nest: undefined
    };

    cell.root = cell;
    cell.nest = nestCell(nestPatch, cell);

    return cell;
  });

  const effects = Object.assign({ effects: [] }, app).effects;
  cells.map(cell => effects.forEach(effect => effect(cell)));

  return cells;
};

export default setup;
