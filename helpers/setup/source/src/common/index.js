// @ts-check

/**
 * @template T
 * @callback Stream
 *
 * @param {T} [value]
 *
 * @return {T} the value
 */

/**
 * Stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
 * which you provide either a function or an object with a `stream` function to create a stream. The
 * function or object must also have a `scan` property. The returned stream must have a `map`
 * method.
 *
 * @typedef {(Object|Function)} StreamLib
 *
 * @param {*} [value] the stream's initial value.
 *
 * @property {Function<T>} stream the function to create a stream, if the stream library itself is
 * not a function.
 * @property {Function} scan the stream library's `scan` function.
 *
 * @return {Stream<T>} the created stream.
 */

/**
 * @template S, P
 * @callback Accumulator
 *
 * @param {S} state
 * @param {P} patch
 *
 * @return {S} updated state
 */

/**
 * @template P
 * @callback Combine
 *
 * @param {P[]} patches
 *
 * @return {P} patch
 */

/**
 * @template S, P
 * @callback Service
 *
 * @param {S} state
 *
 * @return {P} the patch.
 */

/**
 * @template S
 * @callback Effect
 *
 * @param {S} state
 *
 * @return {void}
 */

/**
 * @template S, P, A
 * @callback ActionConstructor
 *
 * @param {Stream<P>} update
 * @param {Stream<S>} [states]
 *
 * @return {A} actions
 */

/**
 * @template S, P, A
 * @callback EffectConstructor
 *
 * @param {Stream<P>} update
 * @param {A} [actions]
 *
 * @return {Effect<S>[]} effects
 */

/**
 * Application object.
 *
 * @template S, P, A
 * @typedef {Object} App
 *
 * @property {S} [initial={}] an object that represents the initial state.
 * If not specified, the initial state will be `{}`.
 * @property {Service<S, P>[]} [services=[]] an array of service functions, each of which
 * should be `state => patch?`.
 * @property {ActionConstructor<S, P, A>} [Actions=()=>({})] a function that creates actions, of the form
 * `update => actions`.
 * @property {EffectConstructor<S, P, A>} [Effects=()=>[]] a function that creates effects, of the form
 * `(update, actions) => [effects]`, which each effect is `state => void` and calls `update`
 * and/or `actions`.
 */

/**
 * @template S, P, A
 * @typedef {Object} MeiosisConfig
 *
 * @property {StreamLib} stream the stream library. This works with `meiosis.simpleStream`, `flyd`,
 * `m.stream`, or anything for which you provide either a function or an object with a `stream`
 * function to create a stream. The function or object must also have a `scan` property. The
 * returned stream must have a `map` method.
 * @property {Accumulator<S, P>} accumulator the accumulator function.
 * @property {Combine<P>} combine the function that combines an array of patches into one patch.
 * @property {App<S, P, A>} app the app, with optional properties.
 */

/**
 * @template S, P, A
 * @typedef {Object} Meiosis
 *
 * @property {Stream<S>} states
 * @property {Stream<P>} update
 * @property {A} actions
 */

/**
 * Base helper to setup the Meiosis pattern. If you are using Mergerino, Function Patches, or Immer,
 * use their respective `setup` function instead.
 *
 * Patch is merged in to the state by default. Services have access to the state and can return a
 * patch that further updates the state. State changes by services are available to the next
 * services in the list.
 *
 * After the services have run and the state has been updated, effects are executed and have the
 * opportunity to trigger more updates.
 *
 * @template S, P, A
 * @function meiosis.common.setup
 *
 * @param {MeiosisConfig<S, P, A>} config the Meiosis config
 *
 * @returns {Meiosis<S, P, A>} `{ states, update, actions }`, where `states` and `update` are
 * streams, and `actions` are the created actions.
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

  app = Object.assign({ initial: {}, Actions: () => ({}), services: [], Effects: () => [] }, app);

  const singlePatch = patch => (Array.isArray(patch) ? combine(patch) : patch);
  const accumulatorFn = (state, patch) => (patch ? accumulator(state, singlePatch(patch)) : state);

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update = createStream();

  const runServices = startingState =>
    app.services.reduce((state, service) => accumulatorFn(state, service(state)), startingState);

  const states = scan(
    (state, patch) => runServices(accumulatorFn(state, patch)),
    runServices(app.initial),
    update
  );

  const actions = app.Actions(update, states);
  const effects = app.Effects(update, actions);

  states.map(state => effects.forEach(effect => effect(state)));

  return { states, update, actions };
};
