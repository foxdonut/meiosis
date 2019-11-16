export const K = x => () => x;

export const tap = f => x => {
  f(x);
  return x;
};
