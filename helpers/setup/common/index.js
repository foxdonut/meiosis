/**
 * Application object.
 *
 * @typedef {Object} app
 * @property {Object} [initial={}] - an object that represents the initial state.
 * If not specified, the initial state will be `{}`.
 * @property {Function} [Actions=()=>({})] - a function that creates actions, of the form
 * `update => actions`.
 * @property {Array<Function>} [services=[]] - an array of service functions, each of which
 * should be `({ state, previousState, patch }) => patch?`.
 * @property {Array<Function>} [effects=[]] - an array of effect functions, each of which
 * should be `({ state, previousState, patch, update }) => void`, optionally calling `update`.
 */

/**
 * Stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
 * which you provide either a function or an object with a `stream` function to create a stream. The
 * function or object must also have a `scan` property. The returned stream must have a `map`
 * method.
 *
 * @typedef {Object|Function} StreamLib
 * @param {*} [value] - the stream's initial value.
 * @property {Function} stream - the function to create a stream, if the stream library itself is
 * not a function.
 * @property {Function} scan - the stream library's `scan` function.
 * @return {simpleStream} - the created stream.
 */

/**
 * Base helper to setup the Meiosis pattern. If you are using Mergerino, Function Patches, or Immer,
 * use their respective `setup` function instead.
 *
 * Patch is merged in to the state by default. Services have access to the previous state and can
 * cancel or alter the original patch. State changes by services are available to the next services
 * in the list.
 *
 * @async
 * @function meiosis.common.setup
 *
 * @param {StreamLib} stream - the stream library. This works with `meiosis.simpleStream`, `flyd`,
 * `m.stream`, or anything for which you provide either a function or an object with a `stream`
 * function to create a stream. The function or object must also have a `scan` property. The
 * returned stream must have a `map` method.
 * @param {Function} accumulator - the accumulator function.
 * @param {Function} combine - the function that combines an array of patches into one.
 * @param {app} app - the app, with optional properties.
 *
 * @returns {Object} - `{ update, states, actions }`, where `update` and `states` are streams,
 * and `actions` are the created actions.
 */
export default ({ stream, accumulator, combine, app }) => {
  if (!stream) {
    throw new Error("No stream library was specified.");
  }
  if (!accumulator) {
    throw new Error("No accumulator function was specified.");
  }
  if (!combine) {
    throw new Error("No combine function was specified.");
  }

  app = app || {};
  let { initial, Actions, services, effects } = app;
  initial = initial || {};
  services = services || [];
  effects = effects || [];

  const singlePatch = patch => (Array.isArray(patch) ? combine(patch) : patch);
  const accumulatorFn = (state, patch) => (patch ? accumulator(state, singlePatch(patch)) : state);

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update = createStream();
  const actions = (Actions || (() => ({})))(update);
  const states = createStream();

  // context is { state, patch, previousState }
  // state is optionally updated by service patches; patch and previousState never change.
  // should return ???
  const runServices = context => {
    let updatedContext = context;

    for (let i = 0; i < services.length; i++) {
      // a service should return a patch (optional)
      const servicePatch = services[i](updatedContext);

      updatedContext = Object.assign(updatedContext, {
        state: accumulatorFn(updatedContext.state, servicePatch)
      });
    }
    return updatedContext;
  };

  const contexts = scan(
    (context, patch) =>
      runServices({
        previousState: context.state,
        state: accumulatorFn(context.state, patch),
        patch
      }),
    runServices({ state: initial }),
    update
  );

  contexts.map(context => {
    if (context.state !== states()) {
      states(context.state);
    }

    effects.forEach(effect => {
      effect({
        state: context.state,
        previousState: context.previousState,
        patch: context.patch,
        update,
        actions
      });
    });
  });

  return { update, states, actions };
};
