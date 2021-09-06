// @ts-check

import commonSetup, { meiosisOne as commonMeiosisOne } from "./common";
import mergerinoSetup, { meiosisOne as mergerinoMeiosisOne } from "./mergerino";
import functionPatchesSetup, { meiosisOne as functionPatchesMeiosisOne } from "./functionPatches";
import immerSetup, { meiosisOne as immerMeiosisOne } from "./immer";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup,
    meiosisOne: commonMeiosisOne
  },
  mergerino: {
    setup: mergerinoSetup,
    meiosisOne: mergerinoMeiosisOne
  },
  functionPatches: {
    setup: functionPatchesSetup,
    meiosisOne: functionPatchesMeiosisOne
  },
  immer: {
    setup: immerSetup,
    meiosisOne: immerMeiosisOne
  },
  simpleStream,
  util: {
    get
  }
};
