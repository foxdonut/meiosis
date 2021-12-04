// @ts-check

/** @type {import("./index").get} */
export const get = (object, path) =>
  path.reduce((obj, key) => (obj == undefined ? undefined : obj[key]), object);
