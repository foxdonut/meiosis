import simpleStream from "../simple-stream";
import { assoc, concatIfPresent } from "../util";

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

export interface ExternalStreamLib {
  stream?: any;
  scan: (acc: any, init: any, stream: any) => any;
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

export type CommonUpdate<P> = (patch: P) => any;

/**
 * Meiosis Cell.
 *
 * @template S the State type.
 * @template P the Patch type.
 */
export interface CommonMeiosisCell<S, P> {
  /**
   * The application states.
   */
  state: S;

  /**
   * The `update` stream. Patches should be sent onto this stream by calling `update(patch)`.
   */
  update: CommonUpdate<P>;
}

/**
 * Returned by Meiosis setup.
 *
 * @template S the State type.
 * @template P the Patch type.
 */
export interface CommonMeiosisSetup<S, P> {
  /**
   * The stream of application states.
   */
  states: Stream<S>;

  getCell: () => CommonMeiosisCell<S, P>;
}

export interface UtilityMeiosisSetup<S, P> extends CommonMeiosisSetup<S, P> {
  dropRepeats<T>(states: Stream<T>, selector?: (state: T) => any): Stream<T>;
}

/**
 * Application object.
 *
 * @template S the State type.
 */
export interface CommonApp<S> {
  /**
   * An object that represents the initial state. If not specified, the initial state will be `{}`.
   */
  initial?: S;
}

/**
 * @template S the State type.
 */
export interface CommonMeiosisConfig<S> {
  /**
   * The stream library. This works with `meiosis.simpleStream`, `flyd`, `m.stream`, or anything for
   * which you provide either a function or an object with a `stream` function to create a stream.
   * The function or object must also have a `scan` property. The returned stream must have a `map`
   * method.
   */
  stream?: ExternalStreamLib;

  /**
   * The application object, with optional properties.
   */
  app?: CommonApp<S>;
}

/**
 * Meiosis configuration.
 *
 * @template S the State type.
 * @template P the Patch type.
 */
export interface MeiosisConfig<S, P> extends CommonMeiosisConfig<S> {
  /**
   * The accumulator function.
   */
  accumulator: Accumulator<S, P>;
}

interface CommonService<S> {
  onchange?: (state: S) => any;
  run: (cell: any) => any;
}

type CommonSubComponents<S> = {
  [K in keyof S]?: CommonStateComponent<S[K]>;
};

interface CommonStateComponent<S> {
  initial?: Partial<S>;
  services?: CommonService<S>[];
  subComponents?: CommonSubComponents<S>;
}

const assembleInitialState = <S>(subComponents: CommonSubComponents<S> | undefined): any =>
  subComponents
    ? Object.keys(subComponents).reduce(
        (result, key) =>
          assoc(
            key,
            Object.assign(
              {},
              subComponents[key]?.initial,
              assembleInitialState(subComponents[key]?.subComponents)
            ),
            result
          ),
        {}
      )
    : {};

export const commonGetInitialState = <S>(component: CommonStateComponent<S>): S =>
  Object.assign({}, component.initial, assembleInitialState(component.subComponents));

const assembleServices = <S>(
  subComponents: CommonSubComponents<S> | undefined,
  getCell = cell => cell
): CommonService<S>[] =>
  subComponents
    ? Object.keys(subComponents).reduce((result, key) => {
        const nextGetCell = cell => getCell(cell).nest(key);

        const subComponent: CommonStateComponent<any> = subComponents[key];

        return concatIfPresent(
          result,
          subComponent.services?.map<CommonService<any>>(service => ({
            onchange: state => (service.onchange ? service.onchange(state[key]) : state),
            run: cell => service.run(nextGetCell(cell))
          }))
        ).concat(assembleServices(subComponents[key]?.subComponents, nextGetCell));
      }, [] as CommonService<S>[])
    : [];

export const commonGetServices = <S>(component: CommonStateComponent<S>): CommonService<S>[] =>
  concatIfPresent([] as CommonService<S>[], component.services).concat(
    assembleServices(component.subComponents)
  );

/**
 * Base helper to setup the Meiosis pattern. If you are using Mergerino, Function Patches, or Immer,
 * use their respective `setup` function instead.
 *
 * Patch is merged in to the state by default.
 *
 * @template S the State type.
 * @template P the Patch type.
 *
 * @param {MeiosisConfig<S, P>} config the Meiosis config.
 *
 * @returns {Meiosis<S, P>} the Meiosis setup.
 */
export const setup = <S, P>({
  stream,
  accumulator,
  app
}: MeiosisConfig<S, P>): UtilityMeiosisSetup<S, P> => {
  if (!stream) {
    stream = simpleStream;
  }
  if (!accumulator) {
    throw new Error("No accumulator function was specified.");
  }

  const safeApp = app || {};
  const initial = safeApp.initial || {};

  // falsy patches are ignored
  const accumulatorFn = (state, patch) => (patch ? accumulator(state, patch) : state);

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update: Stream<P> = createStream();
  const updateFn: CommonUpdate<P> = patch => update(patch);

  const states: Stream<S> = scan((state, patch) => accumulatorFn(state, patch), initial, update);

  const getCell = () => ({
    state: states(),
    update: updateFn
  });

  // Credit: James Forbes (https://james-forbes.com/)
  const dropRepeats = <S>(states: Stream<S>, selector: (state: S) => any = x => x): Stream<S> => {
    let prev = undefined;
    const result = createStream();

    states.map(state => {
      const next = selector(state);
      if (next !== prev) {
        prev = next;
        result(next);
      }
    });
    return result;
  };

  return {
    states,
    getCell,
    dropRepeats
  };
};

export default setup;
