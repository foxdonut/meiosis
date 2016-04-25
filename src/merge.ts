interface Merger {
  (target: any, source: any): any;
}

const defaultMerge: Merger = function(target: any, source: any) {
  if (target === undefined || target === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  let output = Object(target);
  for (let index = 1; index < arguments.length; index++) {
    const source = arguments[index];
    if (source !== undefined && source !== null) {
      for (let nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey];
        }
      }
    }
  }
  return output;
};

export { Merger, defaultMerge };
