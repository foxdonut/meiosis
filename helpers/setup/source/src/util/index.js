export const get = (object, path) =>
  path.reduce((obj, key) => (obj == undefined ? undefined : obj[key]), object);

const set = (object, rest, value, fn) => (rest.length > 0 ? fn(object, rest, value) : value);
const safeObject = object =>
  object != null && typeof object === "object" && !Array.isArray(object) ? object : {};

export const setMutate = (object, path, value) => {
  const first = path[0];
  const rest = path.slice(1);

  const target = safeObject(object);
  target[first] = set(target[first], rest, value, setMutate);

  return target;
};

export const setImmutable = (object, path, value) => {
  const first = path[0];
  const rest = path.slice(1);

  const target = safeObject(object);

  return Object.assign({}, target, {
    [first]: set(target[first], rest, value, setImmutable)
  });
};
