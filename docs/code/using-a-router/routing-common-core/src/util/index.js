export const whenPresent = (obj, fn) => {
  if (obj != null) {
    return fn(obj);
  }
};
