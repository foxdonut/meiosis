// @ts-check

import commonSetup, { Nest, meiosisOne as commonMeiosisOne } from "./common";
import mergerinoSetup, {
  nest as mergerinoNest,
  meiosisOne as mergerinoMeiosisOne
} from "./mergerino";
import functionPatchesSetup, {
  nest as functionPatchesNest,
  meiosisOne as functionPatchesMeiosisOne
} from "./functionPatches";
import immerSetup, { nest as immerNest, meiosisOne as immerMeiosisOne } from "./immer";
import simpleStream from "./simple-stream";
import { get, setImmutable, setMutate } from "./util";

export default {
  common: {
    setup: commonSetup,
    Nest,
    meiosisOne: commonMeiosisOne
  },
  mergerino: {
    setup: mergerinoSetup,
    nest: mergerinoNest,
    meiosisOne: mergerinoMeiosisOne
  },
  functionPatches: {
    setup: functionPatchesSetup,
    nest: functionPatchesNest,
    meiosisOne: functionPatchesMeiosisOne
  },
  immer: {
    setup: immerSetup,
    nest: immerNest,
    meiosisOne: immerMeiosisOne
  },
  simpleStream,
  util: {
    get,
    setImmutable,
    setMutate
  }
};
