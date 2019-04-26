import { setup as commonSetup } from "./common/setup";
import { setup as patchinkoSetup } from "./patchinko/setup";
import { setup as functionPatchesSetup } from "./functionPatches/setup";

export default {
  common: {
    setup: commonSetup
  },
  patchinko: {
    setup: patchinkoSetup
  },
  functionPatches: {
    setup: functionPatchesSetup
  }
};
