import flyd from "flyd";

export const I = x => x;
export const T = (x, f) => f(x);

export const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

// Using reduce, courtesy Barney Carroll (https://github.com/barneycarroll)
export const get = (object, path) =>
  path.reduce((obj, key) => obj == undefined ? undefined : obj[key], object);

export const propPath = path => object => get(object, path);

export const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

export const dropRepeats = getter => stream => {
  const result = flyd.stream();
  let previous = null;
  stream.map(state => {
    const value = getter(state);
    if (value != null && value !== previous) {
      previous = value;
      result(state);
    }
  });
  return result;
};
