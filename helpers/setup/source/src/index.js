// @ts-check

import commonSetup from "./common";
import mergerinoSetup from "./mergerino";
import functionPatchesSetup from "./functionPatches";
import immerSetup from "./immer";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup
  },
  mergerino: {
    setup: mergerinoSetup
  },
  functionPatches: {
    setup: functionPatchesSetup
  },
  immer: {
    setup: immerSetup
  },
  simpleStream,
  util: {
    get
  }
};
