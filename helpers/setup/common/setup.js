/**
 * Application object.
 *
 * @typedef {Object} app
 * @property {Function} [Initial=()=>({})] -  a function that creates the initial state.
 * This function can return a result or a `Promise`. If not specified, the initial state will
 * be `{}`.
 * @property {Function} [Actions=()=>({})] - a function that creates actions, of the form
 * `({ update, combine }) => actions`.
 * @property {Array<Function>} [acceptors=[]] - an array of acceptor functions, each of which
 * should be `state => patch` or `state => [patch]`.
 * @property {Array<Function>} [services=[]] - an array of service functions, each of which
 * should be `({ state, update, actions }) => void`.
 */

/**
 * Stream library. This works with `meiosis.simpleStream`, `flyd`, * `m.stream`, or anything
 * for which you provide either a function or an object with a `stream` function to create a stream.
 * The function or object must also have a `scan` property.
 * The returned stream must have a `map` method.
 *
 * @typedef {Object|Function} StreamLib
 * @param {*} [value] - the stream's initial value.
 * @property {Function} stream - the function to create a stream, if the stream library itself is
 * not a function.
 * @property {Function} scan - the stream library's `scan` function.
 * @return {simpleStream} - the created stream.
 */

const B = (f, g) => (...args) => f(g(...args));

/**
 * Base helper to setup the Meiosis pattern. If you are using Patchinko, Function Patches,
 * or Immer, use their respective `setup` function instead.
 *
 * @async
 * @function meiosis.common.setup
 *
 * @param {StreamLib} stream - the stream library. This works with `meiosis.simpleStream`, `flyd`,
 * `m.stream`, or anything for which you provide either a function or an object with a `stream`
 * function to create a stream. The function or object must also have a `scan` property.
 * The returned stream must have a `map` method.
 * @param {Function} accumulator - the accumulator function.
 * @param {Function} combine - the function that combines an array of patches into one.
 * @param {app} app - the app, with optional properties.
 *
 * @returns {Promise} - a Promise that resolves to `{ update, models, states, actions }`
 * all of which are streams, except for `actions` which is the created actions.
 */
export const setup = ({ stream, accumulator, combine, app }) => {
  app = app || {};
  let { Initial, acceptors, services, Actions } = app;
  Initial = Initial || (() => ({}));
  acceptors = acceptors || [];
  services = services || [];

  if (!stream) {
    throw new Error("No stream library was specified.");
  }
  if (!accumulator) {
    throw new Error("No accumulator function was specified.");
  }
  if (!combine && services.length > 0) {
    throw new Error("No combine function was specified.");
  }

  const singlePatch = patch => (Array.isArray(patch) ? combine(patch) : patch);

  const accept =
    acceptors.length > 0
      ? model =>
          acceptors.reduce((mdl, acceptor) => accumulator(mdl, singlePatch(acceptor(mdl))), model)
      : x => x;

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;
  const hasServices = services.length > 0;

  return Promise.resolve()
    .then(Initial)
    .then(initialState => {
      const update = createStream();

      const models = scan(B(accept, accumulator), accept(initialState), update);

      let buffered = false,
        buffer = [],
        serviceUpdate = false;

      const bufferedUpdate = hasServices
        ? patch => {
            if (buffered) {
              buffer.push(patch);
            } else {
              update(patch);
            }
          }
        : update;

      const states = hasServices ? createStream(models()) : models;
      const actions = (Actions || (() => ({})))({ update: bufferedUpdate, combine });

      if (hasServices) {
        models.map(state => {
          // If the call comes from a service update, we just want to emit the resulting state.
          if (serviceUpdate) {
            serviceUpdate = false;
            states(state);
          } else {
            buffered = true;
            buffer = [];

            services.forEach(service => service({ state, update: bufferedUpdate, actions }));
            buffered = false;

            if (buffer.length > 0) {
              // Services produced patches, issue an update and emit the resulting state.
              serviceUpdate = true;
              update(combine(buffer));
            } else {
              // No service updates, just emit the resulting state.
              states(state);
            }
          }
        });
      }

      return {
        update,
        models,
        states,
        actions
      };
    });
};
