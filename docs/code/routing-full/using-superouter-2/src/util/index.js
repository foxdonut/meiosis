import { Either, tags } from "stags";

export const Data = tags("Data", ["None", "Loading", "Loaded"]);

export const K = x => () => x;

export const { Y, N } = Either;

export const path = (props, object) =>
  props.reduce((obj, key) => (obj == undefined ? undefined : obj[key]), object);

export const expandKeys = obj =>
  Object.keys(obj).reduce((result, key) => {
    const value = obj[key];
    key
      .split(",")
      .map(k => k.trim())
      .forEach(k => {
        result[k] = value;
      });
    return result;
  }, {});
