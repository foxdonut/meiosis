// @ts-check

/**
 * Simple stream implementation.
 *
 * @type {import("../common/index").StreamConstructor}
 */
export const stream = initial => {
  const mapFunctions = [];
  let latestValue = initial;
  // credit @cmnstmntmn for discovering this bug.
  // Keep track of mapped values so that they are sent to mapped streams in order.
  // Otherwise, if f1 triggers another update, f2 will be called with value2 then value1.
  let mappedValues = [];
  /** @type {import("../common/index").Stream} */
  const createdStream = function (value) {
    if (arguments.length > 0 && !createdStream.ended) {
      latestValue = value;
      mappedValues.forEach(arr => arr.push(value));
      for (const i in mapFunctions) {
        const nextValue = mappedValues[i].shift();
        mapFunctions[i](nextValue);
      }
    }
    return latestValue;
  };
  createdStream.map = mapFunction => {
    const newStream = stream();

    mapFunctions.push(value => {
      newStream(mapFunction(value));
    });
    mappedValues.push([]);

    if (latestValue !== undefined) {
      newStream(mapFunction(latestValue));
    }

    return newStream;
  };
  createdStream.end = () => {
    createdStream.ended = true;
  };
  return createdStream;
};

/** @type {import("../common/index").Scan} */
export const scan = (accumulator, initial, sourceStream) => {
  const newStream = stream(initial);
  let accumulated = initial;

  sourceStream.map(value => {
    accumulated = accumulator(accumulated, value);
    newStream(accumulated);
  });

  return newStream;
};

/** @type {import("./index").streamLib} */
const streamLib = {
  stream,
  scan
};

export default streamLib;
