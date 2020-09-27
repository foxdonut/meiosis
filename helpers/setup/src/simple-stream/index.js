// @ts-check

/**
 * Simple stream implementation.
 *
 * @template T, U
 * @typedef {Object} SimpleStream
 *
 * @property {import("../common").StreamConstructor<T>} stream the stream constructor function.
 * @property {import("../common").Scan<T, U>} scan the scan function.
 */

/**
 * Creates a stream.
 *
 * @function meiosis.simpleStream.stream
 * @param {*} [initial] - the stream's initial value.
 * @returns {import("../common").Stream} the created stream.
 */
export const stream = initial => {
  const mapFunctions = [];
  let latestValue = initial;
  const createdStream = value => {
    if (value !== undefined) {
      latestValue = value;
      for (const i in mapFunctions) {
        mapFunctions[i](value);
      }
    }
    return latestValue;
  };
  createdStream.map = mapFunction => {
    const newStream = stream(latestValue !== undefined ? mapFunction(latestValue) : undefined);

    mapFunctions.push(value => {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
};

/**
 * Creates a new stream that starts with the initial value and, for each value arriving onto the
 * source stream, emits the result of calling the accumulator function with the latest result and
 * the source stream value.
 *
 * @template T, U
 * @type {import("../common").Scan<T, U>}
 */
export const scan = (accumulator, initial, sourceStream) => {
  const newStream = stream(initial);
  let accumulated = initial;

  sourceStream.map(value => {
    accumulated = accumulator(accumulated, value);
    newStream(accumulated);
  });

  return newStream;
};

/**
 * @template T, U
 * @type SimpleStream<T, U>
 */
export default {
  stream,
  scan
};
