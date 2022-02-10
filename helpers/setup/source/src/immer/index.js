// @ts-check

import commonSetup from "../common";

/** @type {import("./index").setup} */
export const setup = ({ stream, produce, app }) => {
  const nestPatch = (patch, prop) => state => {
    state[prop] = produce(state[prop], patch);
  };

  return commonSetup({
    stream,
    accumulator: produce,
    // can't use patches.reduce(produce, state) because that would send a third argument to produce
    combine: patches => state => patches.reduce((result, patch) => produce(result, patch), state),
    nestPatch,
    app
  });
};

export default setup;
