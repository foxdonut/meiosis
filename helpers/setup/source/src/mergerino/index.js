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

const createNestPatch = prop => patch => ({ [prop]: patch });

/*
const nnest = (prop, parent = nestPatch(prop)) => ({
  patch: patch => parent(patch),
  nest: nextProp => nnest(nextProp, patch => parent(nestPatch(nextProp)(patch)))
});

nnest("temperature").nest("air").patch({});
*/

/** @type {import("./index").meiosisOne} */
export const meiosisOne = ({ stream, merge, app }) =>
  commonMeiosisOne({
    stream,
    accumulator: merge,
    combine: patches => patches,
    app,
    createNestPatch
  });
