/**
 * A mapping function.
 *
 * @template T the type of the source value.
 * @template R the type of the returned value.
 *
 * @param {T} value the source value.
 *
 * @returns {R} the result of callnng the map function on the source value.
 */
export type MapFunction<T, R> = (value: T) => R;

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
 *
 * @param {T} [value] the stream's initial value.
 *
 * @returns {Stream<T>} the created stream.
 */
export type StreamConstructor = <T>(value?: T) => Stream<T>;

/**
 * Accumulator function.
 *
 * @template R the type of the result value.
 * @template T the type of the source value.
 *
 * @param {R} result the current accumulated result value.
 * @param {T} next the next source value.
 *
 * @returns {R} the accumulated result value.
 */
export type Accumulator<R, T> = (result: R, next: T) => R;

/**
 * Stream library `scan` function.
 *
 * @template T the type of the source stream's values.
 * @template R the type of the returned stream's values.
 *
 * @param {Accumulator<R, T>} acc the accumulator function.
 * @param {R} init the returned stream's initial value.
 * @param {Stream<T>} stream the source stream.
 *
 * @returns {Stream<R>} a stream resulting from scanning the source stream.
 */
export type Scan = <T, R>(acc: Accumulator<R, T>, init: R, stream: Stream<T>) => Stream<R>;

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
 *
 * @param {P[]} patches the array of patches.
 *
 * @returns {P | P[]} the result of combining the array of patches.
 */
export type Combine<P> = (patches: P[]) => P | P[];

/**
 * A service function. Receives the current state and returns a patch to be applied to the state.
 *
 * @template S the State type.
 * @template P the Patch type.
 *
 * @param {S} state the current state.
 *
 * @returns {P} the patch to be applied to the state.
 */
export type Service<S, P> = (state: S) => P;

/**
 * An effect function. Receives the current state and optionally performs a side effects, including
 * but not limited to, calling `update` and/or `actions` which are provided to the effect
 * constructor.
 *
 * @template S the State type.
 *
 * @param {S} state the current state.
 */
export type Effect<S> = (state: S) => void;

/**
 * An effects constructor. Receives the `update` stream and the `actions`, and returns an array of
 * effect functions to be called when the application state changes.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 *
 * @param {Stream<P>} update the `update` stream.
 * @param {A} [actions] the application's `actions`.
 *
 * @returns {Effect<S>} the array of effect functions that will get called on state changes.
 */
export type EffectConstructor<S, P, A> = (update: Stream<P>, actions?: A) => Effect<S>[];

/**
 * Constructor of application actions.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 *
 * @param {Stream<P>} update the `update` stream.
 * @param {Stream<S>} [states] the stream of application states.
 *
 * @returns {A} the application's actions.
 */
export type ActionConstructor<S, P, A> = (update: Stream<P>, states?: Stream<S>) => A;

/**
 * Application object that provides the application's initial state, the service functions, the
 * application's actions, and the effects, all of which are optional.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export type App<S, P, A> = {
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
  Effects?: EffectConstructor<S, P, A>;
};

/**
 * Meiosis configuration.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export type MeiosisConfig<S, P, A> = {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream: StreamLib;

  /**
   * The accumulator function.
   */
  accumulator: Accumulator<S, P>;

  /**
   * The function that combines an array of patches into one patch.
   */

  combine: Combine<P>;

  /**
   * The application object, with optional properties.
   */
  app: App<S, P, A>;
};

/**
 * Returned by Meiosis setup.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export type Meiosis<S, P, A> = {
  /**
   * The stream of application states.
   */
  states: Stream<S>;

  /**
   * The `update` stream. Patches should be sent onto this stream by calling `update(patch)`.
   */
  update: Stream<P>;

  /**
   * The application's actions.
   */
  actions: A;
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
export function Setup<S, P, A>(config: MeiosisConfig<S, P, A>): Meiosis<S, P, A>;

export default Setup;

/**
 * A local path.
 */
export interface LocalPath {
  /** The `path` which is stored on the local object for internal use. */
  path: Array<string>;
}

/**
 * Function that nests a patch `P2` within a parent patch `P1`.
 *
 * @template P1 the type of the parent patch.
 * @template P2 the type of the patch to be nested.
 *
 * @param {P2} patch the nested patch.
 *
 * @returns {P1} the parent patch with `P2` nested within.
 */
type NestPatchFunction<P1, P2> = (patch: P2) => P1;

/**
 * A local object with a `patch` function to create a nested patch.
 *
 * @template P1 the type of the parent patch.
 * @template P2 the type of the patch to be nested.
 */
export interface LocalPatch<P1, P2> {
  /** Creates a nested patch. */
  patch: NestPatchFunction<P1, P2>;
}

/**
 * @template S1 the type of the parent state.
 * @template P1 the type of the parent patch.
 * @template S2 the type of the nested state.
 * @template P2 the type of the patch to be nested.
 */
export interface Local<S1, P1, S2, P2> extends LocalPath, LocalPatch<P1, P2> {
  /** Function to get the local state from the global state. */
  get: (state: S1) => S2;
}

/**
 * Function that creates a local object from the specified nest path and, optionally, another
 * local object.
 */
type NestFunction<S1, P1, S2, P2> = (
  path: string | Array<string>,
  local?: LocalPath
) => Local<S1, P1, S2, P2>;

/**
 * Constructor to create a `nest` function.
 *
 * @template S1 the type of the parent state.
 * @template P1 the type of the parent patch.
 * @template S2 the type of the nested state.
 * @template P2 the type of the patch to be nested.
 */
declare function Nest<S1, P1, S2, P2>(
  createNestPatchFunction: (path: Array<string>) => NestPatchFunction<P1, P2>
): NestFunction<S1, P1, S2, P2>;

export { Nest };

export interface CreateNestPatchFunction {
  /**
   * Creates a function that nests a patch at a given path.
   *
   * @param {Array<String>} path the path at which to nest.
   *
   * @returns {NestPatchFunction<P1, P2>} the nest patch function.
   */
  createNestPatchFunction: <P1, P2>(path: Array<string>) => NestPatchFunction<P1, P2>;
}

/**
 * Meiosis One configuration.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface MeiosisOneConfig<S, P, A>
  extends MeiosisConfig<S, P, A>,
    CreateNestPatchFunction {}

/**
 * Returned by Meiosis One setup.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 */
export interface MeiosisOne<S, P, A> {
  states: Stream<S>;
  getState: () => S;
  update: Stream<P>;
  actions?: A;
  root: MeiosisOne<S, P, A>;
  nest: <K extends keyof S>(prop: K) => MeiosisOne<S[K], P, A>;
}

/**
 * Base helper to setup Meiosis One. If you are using Mergerino, Function Patches, or Immer,
 * use their respective `meiosisOne` function instead.
 *
 * @template S the State type.
 * @template P the Patch type.
 * @template A the Actions type.
 *
 * @param {MeiosisOneConfig<S, P, A>} config the Meiosis One config.
 *
 * @returns {MeiosisOne<S, P, A>} the Meiosis One setup.
 */
export function meiosisOne<S, P, A>(config: MeiosisOneConfig<S, P, A>): MeiosisOne<S, P, A>;
