// @ts-check

/**
 * Simple stream implementation.
 *
 * @template T, U
 * @typedef {Object} SimpleStream
 *
 * @property {import("../common").StreamConstructor} stream the stream constructor function.
 * @property {import("../common").Scan} scan the scan function.
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
  // credit @cmnstmntmn for discovering this bug
  // Keep track of mapped values so that they are sent to mapped streams in order.
  // Otherwise, if f1 triggers another update, f2 will be called with value2 then value1.
  let mappedValues = [];
  const createdStream = value => {
    if (value !== undefined) {
      latestValue = value;
      mappedValues.forEach(arr => arr.push(value));
      for (const i in mapFunctions) {
        const nextValue = mappedValues[i].shift();
        mapFunctions[i](nextValue);
      }
    }
    return latestValue;
  };
  /**
   * @type {import("../common").Map}
   */
  createdStream.map = mapFunction => {
    const newStream = stream(latestValue !== undefined ? mapFunction(latestValue) : undefined);

    mapFunctions.push(value => {
      newStream(mapFunction(value));
    });
    mappedValues.push([]);

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
 * @type {import("../common").Scan}
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
