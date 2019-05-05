/**
 * Helper to setup the Meiosis pattern.
 *
 * @param {stream} the stream library. This works with either `flyd`, `m.stream`, or anything
 * for which you provide either a function or an object with a `stream` function to create a stream.
 * The function or object must also have a `scan` property.
 * The returned stream must have a `map` method.
 * @param {accumulator} the accumulator function.
 * @param {combinator} the patch combinator function.
 * @param {app.Initial} (optional) a function that creates the initial state. This function can return
 * a result * or a Promise. If not specified, the initial state will be `{}`.
 * @param {app.Actions} (optional) a function that creates actions, of the form `update => actions`.
 * @param {app.acceptors} (optional) an array of `accept` functions, each of which should be
 * `state => patch`.
 * @param {app.services} (optional) an array of `service` functions, each of which should be
 * `({ state, update, actions }) => void`.
 *
 * @returns a Promise that resolves to { update, models, accepted, states, actions }
 * all of which are streams, except for `actions` which is the created actions.
 */
export const setup = ({ stream, accumulator, combinator, app }) => {
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
  if (!combinator && services.length > 0) {
    throw new Error("No combinator function was specified.");
  }

  const accept =
    acceptors.length > 0
      ? model => acceptors.reduce((mdl, acceptor) => accumulator(mdl, acceptor(mdl)), model)
      : x => x;

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;
  const hasServices = services.length > 0;

  return Promise.resolve()
    .then(Initial)
    .then(initialState => {
      const update = createStream();

      const models = scan(
        (model, patch) => accept(accumulator(model, patch)),
        accept(initialState),
        update
      );

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

      const states = hasServices ? createStream() : models;
      const actions = (Actions || (() => ({})))(bufferedUpdate);

      if (hasServices) {
        models.map(state => {
          // If the call comes from a service update, we just want to emit the resulting state.
          if (serviceUpdate) {
            serviceUpdate = false;
            buffered = false;
            states(state);
          } else {
            buffered = true;
            buffer = [];

            services.forEach(service => service({ state, update: bufferedUpdate, actions }));

            if (buffer.length > 0) {
              // Services produced patches, issue an update and emit the resulting state.
              serviceUpdate = true;
              update(combinator(buffer));
            } else {
              // No service updates, just emit the resulting state.
              buffered = false;
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
