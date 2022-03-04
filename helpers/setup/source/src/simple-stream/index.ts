import { MapFunction, Stream, StreamLibWithProperty, Scan } from "../common";

/**
 * Creates a stream.
 *
 * @template T the type of the stream's values.
 *
 * @param value the stream's initial value.
 *
 * @returns the created stream.
 */
export const stream = <T>(initial?: T): Stream<T> => {
  const mapFunctions: MapFunction<any, any>[] = [];
  let latestValue = initial as T;
  // credit @cmnstmntmn for discovering this bug.
  // Keep track of mapped values so that they are sent to mapped streams in order.
  // Otherwise, if f1 triggers another update, f2 will be called with value2 then value1.
  const mappedValues: any[] = [];

  const createdStream: Stream<T> = function (value) {
    if (arguments.length > 0 && !createdStream.ended) {
      latestValue = value as T;
      mappedValues.forEach(arr => arr.push(value));
      for (const i in mapFunctions) {
        const nextValue = mappedValues[i].shift();
        mapFunctions[i](nextValue);
      }
    }
    return latestValue;
  };

  createdStream.map = <R>(mapFunction: MapFunction<T, R>) => {
    const newStream: Stream<R> = stream();

    const mappedFunction = value => {
      newStream(mapFunction(value));
    };
    mapFunctions.push(mappedFunction);
    mappedValues.push([]);

    newStream.end = (_value?: boolean) => {
      const idx = mapFunctions.indexOf(mappedFunction);
      newStream.ended = true;
      mapFunctions.splice(idx, 1);
      mappedValues.splice(idx, 1);
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

  sourceStream.map(value => {
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
