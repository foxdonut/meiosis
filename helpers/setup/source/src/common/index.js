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

  /**
   * @template P
   * @type {import("./index").Stream<P>}
   */
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

  // FIXME
  /* @type {import("./index").nestCell} */
  const nestCell = (nestPatch, parentUpdate, getState) => prop => {
    const getNestedState = () => getState()[prop];
    const nestedUpdate = patch => parentUpdate(nestPatch(patch, prop));

    /** @type {import("./index").MeiosisCell} */
    const nested = {
      state: getNestedState(),
      update: nestedUpdate,
      actions: undefined,
      nest: nestCell(nestPatch, nestedUpdate, getNestedState)
    };

    return nested;
  };

  const updateFn = patch => update(patch);
  const nest = nestCell(nestPatch, update, states);

  const getCell = () => ({
    state: states(),
    update: updateFn,
    actions,
    nest
  });

  const effects = Object.assign({ effects: [] }, app).effects;
  states.map(() => effects.forEach(effect => effect(getCell())));

  return {
    states,
    getCell
  };
};

export default setup;
