import { Maybe } from "static-tagged-union";

export const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

// Using reduce, courtesy Barney Carroll (https://github.com/barneycarroll)
export const get = (object, path) =>
  path.reduce((obj, key) => obj == undefined ? undefined : obj[key], object);

export const head = arr => arr[0];
export const tail = arr => arr.slice(1);
export const init = arr => arr.slice(0, arr.length - 1);
export const last = arr => arr[arr.length - 1];
export const append = (arr, element) => arr.slice().concat([element]);

export const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

export const contains = cx => list => {
  const matches = list.filter(it => it.case === cx.case);
  return matches.length > 0 ? Maybe.Y(matches[0].value) : Maybe.N();
};

export const onChange = (stream, path, handler) => {
  let previous = null;
  stream.map(state => {
    const value = get(state, path);
    if (value != null && value !== previous) {
      previous = value;
      handler(state);
    }
  });
};
