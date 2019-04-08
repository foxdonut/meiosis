export const get = (object, path) =>
  path.reduce((obj, prop) => obj == null ? null : obj[prop], object);

export const T = (x, f) => f(x);

export const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

export const Tpipe = (x, ...fns) => T(x, pipe(...fns));

export const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

export const shallowEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  }
  if (obj1 == null || obj2 == null) {
    return false;
  }

  const keys = Object.keys(obj1);

  if (keys.length === Object.keys(obj2)) {
    for (let i = 0, t = keys.length; i < t; i++) {
      const key = keys[i];
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
  return false;
};