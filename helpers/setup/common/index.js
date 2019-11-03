/**
 * Application object.
 *
 * @typedef {Object} app
 * @property {Object} [initial={}] - an object that represents the initial state.
 * If not specified, the initial state will be `{}`.
 * @property {any} [patch=false] - a patch that will initially be sent onto the `update` stream.
 * If not specified, the initial patch will be `false`.
 * @property {Function} [Actions=()=>({})] - a function that creates actions, of the form
 * `update => actions`.
 * @property {Array<Function>} [services=[]] - an array of service functions, each of which
 * should be `({ state, previousState, patch }) => ({ state?, patch?, render?, next? })`.
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
  let { initial, Actions, services } = app;
  initial = initial || {};
  services = services || [];

  const singlePatch = patch => (Array.isArray(patch) ? combine(patch) : patch);
  const accumulatorFn = (state, patch) => (patch ? accumulator(state, singlePatch(patch)) : state);

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update = createStream();
  const actions = (Actions || (() => ({})))(update);
  const states = createStream();

  // context is { state, patch, previousState }
  // should return { state, render, next }
  const updateState = context => {
    let updatedContext = context;

    for (let i = 0; i < services.length; i++) {
      // a service should return { state, patch, render, next } (all optional)
      const serviceUpdate = services[i](updatedContext);

      if (serviceUpdate) {
        // If a service cancelled a patch, abort
        if (serviceUpdate.patch === false) {
          return {
            render: false,
            state: context.previousState,
            next: []
          };
        }
        // If a service changed a patch, abort current and issue the new patch
        if (serviceUpdate.patch) {
          return {
            render: false,
            state: context.previousState,
            next: [({ update }) => update(serviceUpdate.patch)]
          };
        }
        // Append next function
        if (serviceUpdate.next) {
          updatedContext.next.push(serviceUpdate.next);
          delete serviceUpdate.next;
        }
        // Update the context
        updatedContext = Object.assign(updatedContext, serviceUpdate, {
          state: accumulatorFn(updatedContext.state, serviceUpdate.state)
        });
      }
    }
    return updatedContext;
  };

  const contexts = scan(
    (context, patch) =>
      updateState({
        previousState: context.state,
        state: accumulatorFn(context.state, patch),
        patch,
        render: true,
        next: []
      }),
    { state: initial },
    update
  );

  contexts.map(context => {
    if (context.render) {
      states(context.state);
    }
    if (context.next) {
      context.next.forEach(service => {
        service({
          state: context.state,
          patch: context.patch,
          update,
          actions
        });
      });
    }
  });

  // run services on initial state
  update(app.patch || false);

  return { update, contexts, states, actions };
};
