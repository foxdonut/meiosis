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

/**
 * Meiosis Cell.
 *
 * @template S the State type.
 * @template P the Patch type.
 */
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

  /**
   * The `update` stream. Patches should be sent onto this stream by calling `update(patch)`.
   */
  update: Stream<P>;
}

export interface CommonService<S> {
  onchange?: (state: S) => any;
  run: (cell: any) => any;
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
  initial?: Partial<S>;
  services?: CommonService<S>[];
  nested?: CommonNestedApps<S>;
}

type CommonNestedApps<S> = {
  [K in keyof S]?: CommonApp<S[K]>;
};

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

const assembleInitialState = <S>(nestedApps: CommonNestedApps<S> | undefined): any =>
  nestedApps
    ? Object.keys(nestedApps).reduce(
        (result, key) =>
          assoc(
            key,
            Object.assign(
              {},
              nestedApps[key]?.initial,
              assembleInitialState(nestedApps[key]?.nested)
            ),
            result
          ),
        {}
      )
    : {};

export const commonGetInitialState = <S>(app: CommonApp<S>): S =>
  Object.assign({}, app.initial, assembleInitialState(app.nested));

const assembleServices = <S>(
  nestedApps: CommonNestedApps<S> | undefined,
  getCell = cell => cell
): CommonService<S>[] =>
  nestedApps
    ? Object.keys(nestedApps).reduce((result, key) => {
        const nextGetCell = cell => getCell(cell).nest(key);

        const nestedApp: CommonApp<any> = nestedApps[key];

        return concatIfPresent(
          result,
          nestedApp.services?.map<CommonService<any>>(service => ({
            onchange: state => (service.onchange ? service.onchange(state[key]) : state),
            run: cell => service.run(nextGetCell(cell))
          }))
        ).concat(assembleServices(nestedApps[key]?.nested, nextGetCell));
      }, [] as CommonService<S>[])
    : [];

export const commonGetServices = <S>(app: CommonApp<S>): CommonService<S>[] =>
  concatIfPresent([] as CommonService<S>[], app.services).concat(assembleServices(app.nested));

// Credit: James Forbes (https://james-forbes.com/)
export const createDropRepeats = (stream: ExternalStreamLib = simpleStream) => <S>(
  states: Stream<S>,
  selector: (state: S) => any = state => state
): Stream<S> => {
  const createStream = typeof stream === "function" ? stream : stream.stream;

  let prev = undefined;
  const result = createStream();

  states.map(state => {
    const next = selector(state);
    if (next !== prev) {
      prev = next;
      result(state);
    }
  });
  return result;
};

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
}: MeiosisConfig<S, P>): CommonMeiosisSetup<S, P> => {
  if (!stream) {
    stream = simpleStream;
  }
  if (!accumulator) {
    throw new Error("No accumulator function was specified.");
  }

  const initial = commonGetInitialState(app || {});

  // falsy patches are ignored
  const accumulatorFn = (state: S, patch: P) => (patch ? accumulator(state, patch) : state);

  const createStream = typeof stream === "function" ? stream : stream.stream;
  const scan = stream.scan;

  const update: Stream<P> = createStream();

  const states: Stream<S> = scan(
    (state: S, patch: P) => accumulatorFn(state, patch),
    initial,
    update
  );

  return {
    states,
    update
  };
};

export default setup;

export interface NestSetup<S, P> {
  accumulator: Accumulator<S, P>;
  getServices: any;
  nestCell: any;
  stream: ExternalStreamLib;
  app: any;
}

export const nestSetup = <S, P, F extends NestSetup<S, P>, T extends CommonService<S>, C>({
  accumulator,
  getServices,
  nestCell,
  stream = simpleStream,
  app = {}
}: F): Stream<C> => {
  const { states, update } = setup<S, P>({
    stream,
    accumulator,
    app
  });

  const nest = nestCell(states, update);
  const getCell = (state: S) => ({ state, update, nest });
  const dropRepeats = createDropRepeats(stream);

  if (app) {
    getServices(app).forEach((service: T) => {
      dropRepeats(states, service.onchange).map(state => service.run(getCell(state)));
    });
  }

  const cells: Stream<any> = dropRepeats(states).map(getCell);

  return cells;
};
