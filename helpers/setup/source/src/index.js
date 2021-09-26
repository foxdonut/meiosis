// @ts-check

import commonSetup, { createNest, meiosisOne as commonMeiosisOne } from "./common";
import mergerinoSetup, {
  meiosisOne as mergerinoMeiosisOne,
  nest as mergerinoNest
} from "./mergerino";
import functionPatchesSetup, {
  meiosisOne as functionPatchesMeiosisOne,
  nest as functionPatchesNest
} from "./functionPatches";
import immerSetup, { meiosisOne as immerMeiosisOne, nest as immerNest } from "./immer";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup,
    meiosisOne: commonMeiosisOne,
    createNest
  },
  mergerino: {
    setup: mergerinoSetup,
    meiosisOne: mergerinoMeiosisOne,
    nest: mergerinoNest
  },
  functionPatches: {
    setup: functionPatchesSetup,
    meiosisOne: functionPatchesMeiosisOne,
    nest: functionPatchesNest
  },
  immer: {
    setup: immerSetup,
    meiosisOne: immerMeiosisOne,
    nest: immerNest
  },
  simpleStream,
  util: {
    get
  }
};
