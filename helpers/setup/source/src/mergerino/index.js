// @ts-check

import commonSetup, { meiosisOne as commonMeiosisOne } from "../common";

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

/** @type {import("./index").meiosisOne} */
export const meiosisOne = ({ stream, merge, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app,
    createNestPatch
  });
