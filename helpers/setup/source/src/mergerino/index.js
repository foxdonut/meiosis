// @ts-check

import commonSetup, { meiosisOne as commonMeiosisOne, Nest } from "../common";
import { setMutate } from "../util";

/** @type {import("./index").mergerinoSetup} */
const mergerinoSetup = ({ stream, merge, app }) =>
  commonSetup({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app
  });

export default mergerinoSetup;

/** @type {import("../common").CreateNestPatchFunction} */
const createNestPatchFunction = path => patch => setMutate({}, path, patch);

export const nest = Nest(createNestPatchFunction);

/** @type {import("./index").meiosisOne} */
export const meiosisOne = ({ stream, merge, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app,
    createNestPatchFunction
  });
