import commonSetup from "./common";
import patchinkoSetup from "./patchinko";
import mergerinoSetup from "./mergerino";
import functionPatchesSetup from "./functionPatches";
import immerSetup from "./immer";
import simpleStream from "./simple-stream";

export default {
  common: {
    setup: commonSetup
  },
  patchinko: {
    setup: patchinkoSetup
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
  simpleStream
};
