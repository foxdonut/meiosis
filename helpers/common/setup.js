/**
 * Helper to setup the Meiosis pattern.
 *
 * @param {stream} the stream library. This works with either `flyd`, `m.stream`, or anything
 * for which you provide either a function or an object with a `stream` function to create a stream.
 * The function or object must also have a `scan` property.
 * The returned stream must have a `map` method.
 * @param {accumulator} the accumulator function.
 * @param {acceptor} the acceptor reduce function.
 * @param {initial} (optional) a function that creates the initial state. This function can return
 * a result * or a Promise. If not specified, the initial state will be `{}`.
 * @param {acceptors} (optional) an array of `accept` functions, each of which should be
 * `state => patch`.
 * @param {services} (optional) an array of `service` functions, each of which should be
 * `({ state, update, actions }) => void`.
 * @param {actions} (optional) a function that creates actions, of the form `update => actions`.
 *
 * @returns a Promise that resolves to { update, models, accepted, states, actions }
 * all of which are streams, except for `actions` which is the created actions.
 */
export const setup = (stream, accumulator, acceptor, app) => {
  app = app || {};
  let { initial, acceptors, services, actions } = app;

  initial = initial || (() => ({}));
  acceptors = acceptors || [];
  services = services || [];

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  return Promise.resolve()
    .then(initial)
    .then(initialState => {
      const update = createStream();

      const models = scan(
        (model, patch) => acceptors.reduce(acceptor, accumulator(model, patch)),
        acceptors.reduce(acceptor, initialState),
        update
      );

      let buffered = false,
        buffer = [],
        loops = 0;

      const bufferedUpdate = patch => {
        if (buffered) {
          buffer.push(patch);
        } else {
          update(patch);
        }
      };

      const states = createStream();

      actions = (actions || (() => ({})))(bufferedUpdate);

      models.map(state => {
        // For synchronous updates, prevent re-calling all services,
        // and only issue a state change when services have finished.
        buffered = true;
        buffer = [];

        services.map(service => service({ state, update: bufferedUpdate, actions }));

        // Updates are buffered so that every service works on the same state
        // instead of on a state that was changed by a previous service.
        if (buffer.length > 0) {
          loops = buffer.length + 1;
          buffer.forEach(update);
        } else if (loops === 0) {
          loops = 1;
        }

        buffered = false;
        loops--;

        if (loops === 0) {
          states(models());
        }
      });

      return {
        update: bufferedUpdate,
        models,
        states,
        actions
      };
    });
};
