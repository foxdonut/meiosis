// @ts-check

import commonSetup, { createNest, meiosisCell as commonMeiosisCell } from "./common";
import mergerinoSetup, { meiosisCell as mergerinoCell, nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, {
  meiosisCell as functionPatchesCell,
  nest as functionPatchesNest
} from "./functionPatches";
import immerSetup, { meiosisCell as immerCell, nest as immerNest } from "./immer";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup,
    meiosisCell: commonMeiosisCell,
    createNest
  },
  mergerino: {
    setup: mergerinoSetup,
    meiosisCell: mergerinoCell,
    nest: mergerinoNest
  },
  functionPatches: {
    setup: functionPatchesSetup,
    meiosisCell: functionPatchesCell,
    nest: functionPatchesNest
  },
  immer: {
    setup: immerSetup,
    meiosisCell: immerCell,
    nest: immerNest
  },
  simpleStream,
  util: {
    get
  }
};
