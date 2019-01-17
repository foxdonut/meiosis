export const pipe = (...fns) => input => fns.reduce((value, fn) =>
  fn(value), input);

export const preventDefault = evt => {
  evt.preventDefault();
  return evt;
};

export const getNavigation = id => ({ route: { id }});