// @ts-check

import commonSetup, { Nest } from "../common";
import { get, setMutate } from "../util";

/** @type {import("./index").immerSetup} */
const immerSetup = ({ stream, produce, app }) =>
  commonSetup({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    app
  });

export default immerSetup;

export const nest = produce =>
  Nest(path => patch => state => {
    setMutate(state, path, produce(get(state, path), patch));
  });
