// @ts-check

import commonSetup, { createNest, setupCell as commonCell } from "./common";
import mergerinoSetup, { setupCell as mergerinoCell, nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, {
  setupCell as functionPatchesCell,
  nest as functionPatchesNest
} from "./functionPatches";
import immerSetup, { setupCell as immerCell, produceNest } from "./immer";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup,
    setupCell: commonCell,
    createNest
  },
  mergerino: {
    setup: mergerinoSetup,
    setupCell: mergerinoCell,
    nest: mergerinoNest
  },
  functionPatches: {
    setup: functionPatchesSetup,
    setupCell: functionPatchesCell,
    nest: functionPatchesNest
  },
  immer: {
    setup: immerSetup,
    setupCell: immerCell,
    produceNest
  },
  simpleStream,
  util: {
    get
  }
};
