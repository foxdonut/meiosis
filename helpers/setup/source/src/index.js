// @ts-check

import commonSetup, { createNest } from "./common";
import mergerinoSetup, { nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, { nest as functionPatchesNest } from "./functionPatches";
import immerSetup, { produceNest } from "./immer";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup,
    createNest
  },
  mergerino: {
    setup: mergerinoSetup,
    nest: mergerinoNest
  },
  functionPatches: {
    setup: functionPatchesSetup,
    nest: functionPatchesNest
  },
  immer: {
    setup: immerSetup,
    produceNest
  },
  simpleStream,
  util: {
    get
  }
};
