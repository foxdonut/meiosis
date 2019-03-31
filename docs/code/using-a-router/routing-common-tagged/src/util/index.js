export const T = (x, f) => f(x);

export const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

export const Tpipe = (x, ...fns) => T(x, pipe(...fns));

export const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};
