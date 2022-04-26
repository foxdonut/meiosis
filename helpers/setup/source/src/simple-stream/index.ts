/**
 * A mapping function.
 *
 * @template T the type of the source value.
 * @template R the type of the returned value.
 */
export type MapFunction<T, R> = {
  /**
   * @param {T} value the source value.
   *
   * @returns {R} the result of calling the map function on the source value.
   */
  (value: T): R;
};

/**
 * A stream of values.
 *
 * @template T the type of the stream's values.
 */
export type Stream<T> = {
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
};

/**
 * Function that creates a stream.
 *
 * @template T the type of the stream's values.
 */
export type StreamConstructor = {
  /**
   * @param {T} [value] the stream's initial value.
   *
   * @returns {Stream<T>} the created stream.
   */
  <T>(value?: T): Stream<T>;
};

/**
 * Accumulator function.
 *
 * @template R the type of the result value.
 * @template T the type of the source value.
 */
export type Accumulator<R, T> = {
  /**
   * @param {R} result the current accumulated result value.
   * @param {T} next the next source value.
   *
   * @returns {R} the accumulated result value.
   */
  (result: R, next: T): R;
};

/**
 * Stream library `scan` function.
 *
 * @template T the type of the source stream's values.
 * @template R the type of the returned stream's values.
 */
export type Scan = {
  /**
   * @param {Accumulator<R, T>} acc the accumulator function.
   * @param {R} init the returned stream's initial value.
   * @param {Stream<T>} stream the source stream.
   *
   * @returns {Stream<R>} a stream resulting from scanning the source stream.
   */
  <T, R>(acc: Accumulator<R, T>, init: R, stream: Stream<T>): Stream<R>;
};

/**
 * Defines the stream library's `scan` function.
 */
type StreamScan = {
  /**
   * The stream library's `scan` function.
   */
  scan: Scan;
};

/**
 * Interface to adapt an external stream library.
 */
export type ExternalStreamLib = {
  stream?: any;
  scan: (acc: any, init: any, stream: any) => any;
};

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
 * Creates a stream.
 *
 * @template T the type of the stream's values.
 *
 * @param initial the stream's initial value.
 *
 * @returns the created stream.
 */
export const stream = <T>(initial?: T): Stream<T> => {
  const mapFunctions: MapFunction<any, any>[] = [];
  let latestValue = initial as T;

  const createdStream: Stream<T> = function (value) {
    if (arguments.length > 0 && !createdStream.ended) {
      latestValue = value as T;
      for (const i in mapFunctions) {
        // credit @cmnstmntmn for discovering this bug.
        // Make sure to send the latest value.
        // Otherwise, if f1 triggers another update, f2 will be called with value2 then value1 (old value).
        mapFunctions[i](latestValue);
      }
    }
    return latestValue;
  };

  createdStream.map = <R>(mapFunction: MapFunction<T, R>) => {
    const newStream: Stream<R> = stream();

    const mappedFunction = (value) => {
      newStream(mapFunction(value));
    };
    mapFunctions.push(mappedFunction);

    newStream.end = (_value?: boolean) => {
      const idx = mapFunctions.indexOf(mappedFunction);
      newStream.ended = true;
      mapFunctions.splice(idx, 1);
    };

    if (latestValue !== undefined) {
      newStream(mapFunction(latestValue));
    }

    return newStream;
  };

  createdStream.end = (_value?: boolean) => {
    createdStream.ended = true;
  };

  return createdStream;
};

/**
 * Creates a new stream that starts with the initial value and, for each value arriving onto the
 * source stream, emits the result of calling the accumulator function with the latest result and
 * the source stream value.
 */
export const scan: Scan = (accumulator, initial, sourceStream) => {
  const newStream = stream(initial);
  let accumulated = initial;

  sourceStream.map((value) => {
    accumulated = accumulator(accumulated, value);
    newStream(accumulated);
  });

  return newStream;
};

const simpleStream: StreamLibWithProperty = {
  stream,
  scan
};

export default simpleStream;

/**
 * Credit: James Forbes (https://james-forbes.com/)
 *
 * Creates a `dropRepeats` function, which returns new stream that drops repeated values from the
 * source stream.
 *
 * @param stream the stream library, defaults to simpleStream.
 */
export const createDropRepeats =
  (stream: ExternalStreamLib = simpleStream) =>
  /**
   * @param source the source stream.
   * @param onchange function that receives the current state of the source stream and returns the
   * value for which changes will emit onto the returned stream.
   * @returns a stream that does not emit repeated values.
   */
  <S>(source: Stream<S>, onchange: (state: S) => any = (state) => state): Stream<S> => {
    const createStream = typeof stream === 'function' ? stream : stream.stream;

    let prev = undefined;
    const result = createStream();

    source.map((state) => {
      const next = onchange(state);
      if (next !== prev) {
        prev = next;
        result(state);
      }
    });
    return result;
  };

/**
 * `dropRepeats` function that uses `simpleStream`.
 */
export const dropRepeats = createDropRepeats();
