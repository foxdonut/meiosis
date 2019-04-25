import { setup as patchinkoSetup } from "./patchinko/setup";
import { setup as functionPatchesSetup } from "./functionPatches/setup";

export default {
  patchinko: {
    setup: patchinkoSetup
  },
  functionPatches: {
    setup: functionPatchesSetup
  }
};
