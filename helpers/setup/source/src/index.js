// @ts-check

import commonSetup, { createNest, cell as commonCell } from "./common";
import mergerinoSetup, { cell as mergerinoCell, nest as mergerinoNest } from "./mergerino";
import functionPatchesSetup, {
  cell as functionPatchesCell,
  nest as functionPatchesNest
} from "./functionPatches";
import immerSetup, { cell as immerCell, produceNest } from "./immer";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup,
    cell: commonCell,
    createNest
  },
  mergerino: {
    setup: mergerinoSetup,
    cell: mergerinoCell,
    nest: mergerinoNest
  },
  functionPatches: {
    setup: functionPatchesSetup,
    cell: functionPatchesCell,
    nest: functionPatchesNest
  },
  immer: {
    setup: immerSetup,
    cell: immerCell,
    produceNest
  },
  simpleStream,
  util: {
    get
  }
};
