import pathToRegexp from "path-to-regexp";

const I = x => x;

/**
 * Converts a path-to-regexp result to { case, value }
 * @param result an array [route, value1, value2, ...]
 * @param id the page id
 * @param keys the parameter names that correspond to the values
 */
const convert = (result, id, keys) => {
  // result contains [route, values] so extract the values into 'rest'
  const rest = result.slice(1);
  // match the keys to the values to build a { key: value } object
  const value = keys.reduce((acc, key, index) => {
    acc[key] = rest[index];
    return acc;
  }, {});
  return { case: id, value };
};

/**
 * Returns {
 *   parsePath(path) => ({ case, value })
 *   toPath({ case, value }) => path
 * }
 * @param routeMap { case: route }
 * @param prefix the path prefix
 * @param defaultCase (optional) case for invalid url
 * @param defaultValue (optional) value for invalid url
 */
export const createRouter = ({ routeMap, prefix, defaultCase, defaultValue }) => {
  const routes = Object.entries(routeMap).reduce((result, [id, path]) => {
    const keyDefs = [];
    const re = pathToRegexp(path, keyDefs);
    // keyDefs now contains [{name: keyName1}, {name: keyName2}, ...]
    const keys = keyDefs.map(k => k.name);
    // keys is [keyName1, keyName2, ...]

    const exec = path => {
      const result = re.exec(path);
      // result is [ route, value1, value2, ... ]
      // convert to { case, value }
      return result && convert(result, id, keys);
    };
    result[id] = { exec, toPath: pathToRegexp.compile(path) };
    return result;
  }, {});
  // routes is { case: { exec, toPath } }

  const cases = Object.keys(routes);
  // parsePath calls exec on each case and uses the first defined result as { case, value }
  const parsePath = path => {
    path = path || prefix + "/";
    const result = cases.map(id => routes[id].exec(path.substring(prefix.length))).filter(I)[0];
    return result || (defaultCase && { case: defaultCase, value: defaultValue });
  };
  // toPath calls toPath on the case
  const toPath = caseObj => prefix + routes[caseObj.case].toPath(caseObj.value);

  return { parsePath, toPath };
};
