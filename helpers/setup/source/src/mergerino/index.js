// @ts-check

import commonSetup, { createNest, meiosisOne as commonMeiosisOne } from "../common";

/** @type {import("./index").mergerinoSetup} */
const mergerinoSetup = ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });

export default mergerinoSetup;

// -------- Meiosis One

const createNestPatch = prop => patch => ({ [prop]: patch });

/** type {import("./index").nest} */
export const nest = createNest(createNestPatch);

/** @type {import("./index").meiosisOne} */
export const meiosisOne = ({ stream, merge, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });
