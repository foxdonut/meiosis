import pathToRegexp from "path-to-regexp";

const I = x => x;

/**
 * Converts a path-to-regexp result to { id, values }
 * @param result an array [route, value1, value2, ...]
 * @param id the page id
 * @param keys the parameter names that correspond to the values
 */
const convert = (result, id, keys) => {
  // result contains [route, values] so extract the values into 'rest'
  const rest = result.slice(1);
  // match the keys to the values to build a { key: value } object
  const values = keys.reduce((acc, key, index) => {
    acc[key] = rest[index];
    return acc;
  }, {});
  return { id, values };
};

/**
 * Returns {
 *   parsePath(path) => ({ id, values })
 *   toPath({ id, values }) => path
 * }
 * @param routeMap { id: route }
 * @param prefix the path prefix
 * @param defaultId (optional) id for invalid url
 * @param defaultValues (optional) values for invalid url
 */
export const createRouter = ({ routeMap, prefix, defaultId, defaultValues }) => {
  const routes = Object.keys(routeMap).reduce((result, id) => {
    const keyDefs = [];
    const re = pathToRegexp(routeMap[id], keyDefs);
    // keyDefs now contains [{name: keyName1}, {name: keyName2}, ...]
    const keys = keyDefs.map(k => k.name);
    // keys is [keyName1, keyName2, ...]

    const exec = path => {
      const result = re.exec(path);
      // result is [ route, value1, value2, ... ]
      // convert to { id, values }
      return result && convert(result, id, keys);
    };
    result[id] = { exec, toPath: pathToRegexp.compile(routeMap[id]) };
    return result;
  }, {});
  // routes is { id: { exec, toPath } }

  const ids = Object.keys(routes);
  // parsePath calls exec on each id and uses the first defined result as { id, values }
  const parsePath = path => {
    path = path || prefix + "/";
    const result = ids.map(id => routes[id].exec(path.substring(prefix.length))).filter(I)[0];
    return result || (defaultId && { id: defaultId, values: defaultValues });
  };
  // toPath calls toPath on the id
  const toPath = ({ id, values }) => prefix + routes[id].toPath(values);

  return { parsePath, toPath };
};
