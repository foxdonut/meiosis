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
  if (!combinator && acceptors.length > 0) {
    throw new Error("No combinator function was specified.");
  }

  const accept = combinator
    ? model => {
        const patches = acceptors.map(acceptor => acceptor(model));
        return accumulator(model, combinator(patches));
      }
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
        buffer = [];

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
          /*
          For synchronous updates, prevent re-calling all services by accumulating
          updates into a buffer.

          Updates being buffered also ensures that every service works on the same state,
          instead of on a state that was changed by a previous service.
          */
          buffered = true;
          buffer = [];

          services.forEach(service => service({ state, update: bufferedUpdate, actions }));

          /*
          When services have issued updates, combine them into a single update. This prevents
          services being called multiple times; but services *do* get called again when at least
          one service has issued an update. This enables one service to trigger another service.

          For synchronous service updates, a state change is emitted only when services have
          "settled", i.e. have issued no more updates. This reduces the number of state changes.

          The combination of updates into a single update works *only* if a combinator was
          provided. Otherwise, multiple updates are issued. This gives the caller the option of
          not providing a combinator, and being OK with multiple update/service calls.
          */
          if (buffer.length > 0) {
            if (combinator) {
              update(combinator(buffer));
            } else {
              buffer.forEach(update);
            }
          } else {
            states(models());
          }

          buffered = false;
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
