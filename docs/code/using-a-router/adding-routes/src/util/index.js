import flyd from "flyd";

export const I = x => x;
export const T = (x, f) => f(x);

export const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

// Using reduce, courtesy Barney Carroll (https://github.com/barneycarroll)
export const get = (object, path) =>
  path.reduce((obj, key) => obj == undefined ? undefined : obj[key], object);

export const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

export const dropRepeats = (stream, path) => {
  const result = flyd.stream();
  let previous = null;
  stream.map(state => {
    const value = get(state, path);
    if (value != null && value !== previous) {
      previous = value;
      result(state);
    }
  });
  return result;
};
