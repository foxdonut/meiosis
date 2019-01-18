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

export const getNavigation = ({ id, values }) => ({ route: { id, values }});
export const parsePath = path => {
  const first = path.indexOf("/");
  const last = path.lastIndexOf("/");
  if (first === last) {
    return { id: path.substring(first + 1) };
  }
  return { id: path.substring(first + 1, last), values: { id: path.substring(last + 1) } };
};

// This is external to the app and is meant to simulate the browser's location bar.
export const getPath = () => document.getElementById("pathInput").value;
export const setPath = path => document.getElementById("pathInput").value = path;
