// @ts-check

import commonSetup, { Nest } from "../common";
import { get, setImmutable } from "../util";

const pipe = fns => args => fns.reduce((arg, fn) => fn(arg), args);

/** @type {import("./index").functionPatchesSetup} */
const functionPatchesSetup = ({ stream, app }) =>
  commonSetup({ stream, accumulator: (x, f) => f(x), combine: pipe, app });

export default functionPatchesSetup;

export const nest = Nest(path => patch => state =>
  setImmutable(state, path, patch(get(state, path)))
);
