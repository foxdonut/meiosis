/**
 * A mapping function.
 *
 * @template T the type of the source value.
 * @template R the type of the returned value.
 */
export interface MapFunction<T, R> {
  /**
   * @param {T} value the source value.
   *
   * @returns {R} the result of calling the map function on the source value.
   */
  (value: T): R;
}

/**
 * A stream of values.
 *
 * @template T the type of the stream's values.
 */
export interface Stream<T> {
  /**
   * Function to either send a value onto the stream -- by providing a value, `stream1(value)` -- or
   * to get the stream's latest value -- by calling the function with no arguments, `stream1()`.
   *
   * @param {T} [value] the value to send onto the stream. If not provided, the function instead
   * returns the stream's latest value.
   *
   * @returns {T} the stream's latest value.
   */
  (value?: T): T;

  /**
   * Function to create a new stream with values that are the result of calling a mapping function
   * on the source stream's values.
   *
   * @template R the type of the returned stream's values.
   *
   * @param fn the mapping function.
   *
   * @returns {Stream<R>} a stream resulting from mapping the source stream.
   */
  map<R>(fn: MapFunction<T, R>): Stream<R>;

  /**
   * Ends a stream, so that the streams that were created with `map` and/or `scan` no longer receive
   * values from this stream.
   *
   * @param {boolean} [value] the value indicating to end the stream.
   */
  end(value?: boolean): void;

  /**
   * Indicates whether or not this stream has been ended.
   */
  ended?: boolean;
}

/**
 * Function that creates a stream.
 *
 * @template T the type of the stream's values.
 */
export interface StreamConstructor {
  /**
   * @param {T} [value] the stream's initial value.
   *
   * @returns {Stream<T>} the created stream.
   */
  <T>(value?: T): Stream<T>;
}

/**
 * Accumulator function.
 *
 * @template R the type of the result value.
 * @template T the type of the source value.
 */
export interface Accumulator<R, T> {
  /**
   * @param {R} result the current accumulated result value.
   * @param {T} next the next source value.
   *
   * @returns {R} the accumulated result value.
   */
  (result: R, next: T): R;
}

/**
 * Stream library `scan` function.
 *
 * @template T the type of the source stream's values.
 * @template R the type of the returned stream's values.
 */
export interface Scan {
  /**
   * @param {Accumulator<R, T>} acc the accumulator function.
   * @param {R} init the returned stream's initial value.
   * @param {Stream<T>} stream the source stream.
   *
   * @returns {Stream<R>} a stream resulting from scanning the source stream.
   */
  <T, R>(acc: Accumulator<R, T>, init: R, stream: Stream<T>): Stream<R>;
}

/**
 * Defines the stream library's `scan` function.
 */
interface StreamScan {
  /**
   * The stream library's `scan` function.
   */
  scan: Scan;
}

/**
 * Stream library that provides a function to create a stream.
 *
 * @template T the type of the stream's values.
 */
export interface StreamLibWithFunction extends StreamScan {
  /**
   * The function to create a stream.
   *
   * @param {T} [value] the initial value for the stream.
   *
   * @returns {Stream<T>} the created stream.
   */
  <T>(value?: T): Stream<T>;
}

/**
 * Stream library that provides a `stream` property which is a function to create a stream.
 *
 * @template T the type of the stream's values.
 */
export interface StreamLibWithProperty extends StreamScan {
  /**
   * The function to create a stream.
   *
   * @param {T} [value] the initial value for the stream.
   *
   * @returns {Stream<T>} the created stream.
   */
  stream<T>(value?: T): Stream<T>;
}

/**
 * Stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for which
 * you provide either a function or an object with a `stream` function to create a stream. The
 * function or object must also have a `scan` property. The returned stream must have a `map`
 * method.
 */
export type StreamLib = StreamLibWithFunction | StreamLibWithProperty;

/**
 * Combines an array of patches into a single patch.
 *
 * @template P the Patch type.
 */
export interface Combine<P> {
  /**
   * @param {P[]} patches the array of patches.
   *
   * @returns {P} the result of combining the array of patches.
   */
  (patches: P[]): P;
}

export type Update<P> = (patch: P) => any;

/**
 * Returned by Meiosis setup.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface MeiosisBase<P, A> {
  /**
   * The `update` stream. Patches should be sent onto this stream by calling `update(patch)`.
   */
  update: Update<P>;

  /**
   * The application's actions.
   */
  actions: A;
}

/**
 * Returned by Meiosis setup.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface MeiosisContext<S, P, A = unknown> extends MeiosisBase<P, A> {
  /**
   * The stream of application states.
   */
  getState: () => S;
}

/**
 * Meiosis Cell.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface MeiosisCell<S, P, A = unknown> extends MeiosisBase<P, A> {
  /**
   * The application states.
   */
  state: S;

  nest: <K extends Extract<keyof S, string>, N>(prop: K) => MeiosisCell<S[K], N>;
}

/**
 * Returned by Meiosis setup.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface MeiosisSetup<S, P, A = unknown> {
  /**
   * The stream of application states.
   */
  states: Stream<S>;

  getCell: () => MeiosisCell<S, P, A>;
}

/**
 * Function that nests a patch at a given property.
 */
export interface NestPatch {
  <N, K, P>(patch: N, prop: K): P;
}

export interface NestProp<S, K extends Extract<keyof S, string>, N> {
  (prop: K): MeiosisCell<S[K], N>;
}

/**
 * A service function. Receives the current state and returns a patch to be applied to the state.
 *
 * @template S the State type.
 * @template P the Patch type.
 */
export interface Service<S, P> {
  /**
   * @param {S} state the current state.
   *
   * @returns {P} the patch to be applied to the state.
   */
  (state: S): P;
}

/**
 * An effect function. Receives the current state, the `update` stream, and the `actions`, and
 * optionally performs side effects.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface Effect<S, P, A> {
  /**
   * @param {S} state the current state.
   * @param {P} update the update stream.
   * @param {A} actions the application actions.
   */
  (cell: MeiosisCell<S, P, A>): void;
}

/**
 * Constructor of application actions.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface ActionConstructor<S, P, A> {
  /**
   * @param {Meiosis<S, P, A>} cell the Meiosis cell.
   *
   * @returns {A} the application's actions.
   */
  (cell: MeiosisContext<S, P, A>): A;
}

/**
 * Application object that provides the application's initial state, the service functions, the
 * application's actions, and the effects, all of which are optional.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface App<S, P, A> {
  /**
   * An object that represents the initial state. If not specified, the initial state will be `{}`.
   */
  initial?: S;

  /**
   * An array of service functions.
   */
  services?: Service<S, P>[];

  /**
   * A function that creates the application's actions.
   */
  Actions?: ActionConstructor<S, P, A>;

  /**
   * A function that creates the application's effects.
   */
  effects?: Effect<S, P, A>[];
}

/**
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface MeiosisConfigBase<S, P, A> {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;

  /**
   * The application object, with optional properties.
   */
  app: App<S, P, A>;
}

/**
 * Meiosis configuration.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface MeiosisConfig<S, P, A> extends MeiosisConfigBase<S, P, A> {
  /**
   * The accumulator function.
   */
  accumulator: Accumulator<S, P>;

  /**
   * The function that combines an array of patches into one patch.
   */
  combine: Combine<P>;

  /**
   * How to nest a patch.
   */
  nestPatch: NestPatch;
}

/**
 * Convenience function to convert flyd or mithril-stream to `StreamLib` with TypeScript.
 */
export const toStream = (streamLib: StreamLibWithProperty): StreamLib => {
  const streamFn = streamLib.stream || streamLib;

  return {
    stream: value => streamFn(value),
    scan: (acc, init, stream) => streamLib.scan(acc, init, stream)
  };
};

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
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 *
 * @param {MeiosisConfig<S, P, A>} config the Meiosis config.
 *
 * @returns {Meiosis<S, P, A>} the Meiosis setup.
 */
export const setup = <S, P, A = unknown>({
  stream,
  accumulator,
  combine,
  nestPatch,
  app
}: MeiosisConfig<S, P, A>): MeiosisSetup<S, P, A> => {
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

  const update: Stream<P> = createStream();
  const updateFn = patch => update(patch);

  const runServices = startingState =>
    services.reduce((state, service) => accumulatorFn(state, service(state)), startingState);

  const states = scan(
    (state, patch) => runServices(accumulatorFn(state, patch)),
    runServices(initial),
    update
  );

  const defaultActions = {} as A;
  const context: MeiosisContext<S, P, A> = {
    getState: () => states(),
    update: updateFn,
    actions: defaultActions
  };

  if (safeApp.Actions) {
    context.actions = safeApp.Actions(context);
  }

  const nestCell = <S, K extends Extract<keyof S, string>, N, P>(
    nestPatch: NestPatch,
    parentUpdate: Update<P>,
    getState: () => S
  ): NestProp<S, K, N> => (prop: K): MeiosisCell<S[K], N> => {
    const getNestedState = () => getState()[prop];

    const nestedUpdate: Update<N> = patch => parentUpdate(nestPatch(patch, prop));

    const nested: MeiosisCell<S[K], N> = {
      state: getNestedState(),
      update: nestedUpdate,
      actions: defaultActions,
      nest: nestCell(nestPatch, nestedUpdate, getNestedState)
    };

    return nested;
  };

  const getCell = () => ({
    state: states(),
    update: updateFn,
    actions: context.actions,
    nest: nestCell(nestPatch, updateFn, states)
  });

  const effects = safeApp.effects || [];
  states.map(() => effects.forEach(effect => effect(getCell())));

  return {
    states,
    getCell
  };
};

export default setup;
