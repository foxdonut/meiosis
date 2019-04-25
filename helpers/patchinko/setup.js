/**
 * Helper to setup the Meiosis pattern.
 *
 * @param {O} the Patchinko function
 * @param {stream} the stream library. This works with either `flyd`, `m.stream`, or anything
 * for which you provide either a function or `stream` to create a stream, and `scan`.
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
export const setup = ({ O, stream, initial, acceptors, services, actions }) => {
  initial = initial || (() => ({}));
  acceptors = acceptors || [];
  services = services || [];

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update = createStream();
  actions = (actions || (() => ({})))(update);

  return Promise.resolve()
    .then(initial)
    .then(initialState => {
      const models = scan(O, initialState, update);
      const accepted = models.map(state => acceptors.reduce((x, f) => O(x, f(x)), state));
      const states = createStream();

      let buffered = false,
        buffer = [];

      const bufferedUpdate = patch => {
        if (buffered) {
          buffer.push(patch);
        } else {
          update(patch);
        }
      };

      accepted.map(state => {
        // For synchronous updates, prevent re-calling all services,
        // and only issue a state change when services have finished.
        if (!buffered) {
          buffered = true;
          buffer = [];
          services.map(service => service({ state, update: bufferedUpdate, actions }));

          // Updates are buffered so that every service works on the same state
          // instead of on a state that was changed by a previous service.
          if (buffer.length > 0) {
            buffer.forEach(update);
          }

          buffered = false;
          states(state);
        }
      });

      return {
        update,
        models,
        accepted,
        states,
        actions
      };
    });
};
