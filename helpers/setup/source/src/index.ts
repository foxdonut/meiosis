import commonSetup from "./common";
import mSetup, { combinePatches as mCombinePatches } from "./mergerino";
import fSetup, { combinePatches as fCombinePatches } from "./functionPatches";
import simpleStream from "./simple-stream";
import { get } from "./util";

export default {
  common: {
    setup: commonSetup
  },
  mergerino: {
    setup: mSetup,
    combinePatches: mCombinePatches
  },
  functionPatches: {
    setup: fSetup,
    combinePatches: fCombinePatches
  },
  simpleStream,
  util: {
    get
  }
};
