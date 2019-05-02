export const stream = initial => {
  const mapFunctions = [];
  let latestValue = initial;
  const createdStream = value => {
    if (value !== undefined) {
      latestValue = value;
      for (const i in mapFunctions) {
        mapFunctions[i](value);
      }
    } else {
      return latestValue;
    }
  };
  createdStream.map = mapFunction => {
    let newInitial = undefined;
    if (latestValue !== undefined) {
      newInitial = mapFunction(latestValue);
    }
    const newStream = stream(newInitial);

    mapFunctions.push(value => {
      newStream(mapFunction(value));
    });

    return newStream;
  };
  return createdStream;
};

export const scan = (accumulator, initial, sourceStream) => {
  const newStream = stream(initial);
  let accumulated = initial;

  sourceStream.map(value => {
    accumulated = accumulator(accumulated, value);
    newStream(accumulated);
  });

  return newStream;
};

export default {
  stream,
  scan
};
