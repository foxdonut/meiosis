import { Either, tags } from "stags";

export const Data = tags("Data", ["None", "Loading", "Loaded"]);

export const K = x => () => x;

export const { Y, N } = Either;

export const path = (props, object) =>
  props.reduce((obj, key) => (obj == undefined ? undefined : obj[key]), object);
